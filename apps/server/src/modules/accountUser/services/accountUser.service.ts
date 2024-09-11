import { AccountUserModel } from "../../../models/account-user.model";
import { PasswordUtility } from "../../../utils/password.utils";
import { IAccountUserSchema } from "../../../models/account-user.model";
import { CreateAccountUserInput, CreateAsaasSubaccountInput } from "../types/AccountUser.accountUser.types";
import { AccountStatus } from "../enums/accountStatus.enum";
import {
  BasketModel,
  IPaymentLinkSchema,
  PaymentLinkModel,
} from "../../../models";
import { Types } from "mongoose";
import { ErrorMessages } from "../../../utils/errorMessages.enum";
import { BasketType } from "../../basket/types/basket.types";
import {
  BillingType,
  ChargeType,
} from "../../paymentLink/enums/paymentLikns.enum";
import { paymentLinkService } from "../../paymentLink/services/paymentLink.service";
import { CreatePaymentLinkInput } from "../../paymentLink/types/paymentLink.types";
import { MailingHandler } from "../../../mailing/handlers.mailing";
import { PaymentEvents } from "../../webhooks/enums/payment-events.enum";
import { AccountDocumentsStatus } from "../../webhooks/enums/account-documents.enum";
import { asaasClient } from "../../../utils/asaasClient.utils";
import { accountDocumentsService } from '../../accountDocuments/services/accountDocuments.service';

class AccountUserService {
  async preRegisterAccount(
    data: CreateAccountUserInput,
  ): Promise<IAccountUserSchema> {
    try {
      await this.validateEmailUniqueness(data.email);

      const encryptedPassword = PasswordUtility.encryptPassword(data.password);
      const accountUser = new AccountUserModel({
        ...data,
        password: encryptedPassword,
        accountStatus: AccountStatus.PENDING,
        basketId: null,
      });
      return await accountUser.save();
    } catch (error) {
      throw new Error(`Error preRegisterAccount: ${error.message}`);
    }
  }

  //
  async handleAccountUserPaymentReceived(
    userId: Types.ObjectId,
  ): Promise<void | Error> {
    try {
      await this.createAsaasSubaccount(userId);
    } catch (error) {
      return new Error(`Error creating ASAAS subaccount: ${error.message}`);
    }

    await this.updateUserStatusToActive(userId);
  }

  private async createAsaasSubaccount(userId: Types.ObjectId): Promise<void | Error> {
    try {
      const user: IAccountUserSchema = await AccountUserModel.findById(userId);
      if (!user) {
        throw new Error(ErrorMessages.USER_NOT_FOUND);
      }
      console.log('user', user)
      const subaccountData: CreateAsaasSubaccountInput = {
        name: user.name,
        email: user.email,
        cpfCnpj: user.cpfCnpj,
        birthDate: user.birthDate,
        companyType: user.companyType,
        phone: user.phone,
        mobilePhone: user.mobilePhone,
        incomeValue: user.incomeValue,
        address: user.address,
        addressNumber: user.addressNumber,
        complement: user.complement,
        province: user.province,
        postalCode: user.postalCode,
        webhooks: [
          {
            name: "Cobranças",
            url: `${process.env.WEBHOOK_URL}/webhook/payments`,
            email: "contato@ipe.com.br",
            sendType: "SEQUENTIALLY",
            interrupted: false,
            enabled: true,
            apiVersion: 3,
            authToken: "5tLxsL6uoN",
            events: Object.values(PaymentEvents),
          },
          {
            name: "Documentos",
            url: `${process.env.WEBHOOK_URL}/webhook/document-status`,
            email: "contato@ipe.com.br",
            sendType: "SEQUENTIALLY",
            interrupted: false,
            enabled: true,
            apiVersion: 3,
            authToken: "5tLxsL6uoN",
            events: Object.values(AccountDocumentsStatus),
          },
        ],
      };

      const response = await asaasClient.post("/accounts", subaccountData);

      const asaasId = response.data.id;
      const apiKey = response.data.apiKey;
      user.asaasId = asaasId;
      user.asaasApiKey = apiKey;
      await user.save();
      await accountDocumentsService.getPendingDocuments(user._id as Types.ObjectId);
      return user;
    } catch (error) {
      console.log('error', error.response.data.errors)
      return new Error(`Error creating ASAAS subaccount: ${error.message}`);
    }
  }

  async getPendingAccounts(): Promise<IAccountUserSchema[]> {
    return await AccountUserModel.find({
      accountStatus: AccountStatus.PENDING,
    });
  }

  async getPendingAccountByEmail(
    email: string,
  ): Promise<IAccountUserSchema | null> {
    return await AccountUserModel.findOne({
      email,
      accountStatus: AccountStatus.PENDING,
    });
  }

  async checkUserStatus(email: string): Promise<string> {
    const user = await AccountUserModel.findOne({ email });
    if (user && user.accountStatus === AccountStatus.PENDING) {
      return ErrorMessages.USER_STATUS_PENDING;
    }

    if (user && user.accountStatus === AccountStatus.WAITING_PAYMENT) {
      return ErrorMessages.USER_STATUS_WAITING_PAYMENT;
    }

    return ErrorMessages.USER_CAN_PROCEED_WITH_LOGIN;
  }

  async linkBasketToUser(
    intendedUserId: string,
    basketId: string,
    adminUserId: string,
  ): Promise<IAccountUserSchema> {
    const accountUser = await this.fetchAccountUser(intendedUserId);
    const basket = await this.fetchBasket(basketId);

    await this.updateBasketAndStatusAccountUser(accountUser, basketId);

    const paymentLink = await this.createPaymentLink(
      adminUserId,
      intendedUserId,
      basket,
    );

    await this.sendAccountCreationEmail(
      accountUser,
      basket,
      paymentLink,
      basketId,
    );

    return accountUser;
  }

  private async fetchAccountUser(userId: string): Promise<IAccountUserSchema> {
    const accountUser = await AccountUserModel.findById(userId);
    if (!accountUser) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }
    return accountUser;
  }

  private async fetchBasket(basketId: string): Promise<BasketType> {
    const basket: BasketType | null = await BasketModel.findById(basketId);
    if (!basket) {
      throw new Error(ErrorMessages.BASKET_NOT_FOUND);
    }
    return basket;
  }

  private async updateBasketAndStatusAccountUser(
    accountUser: IAccountUserSchema,
    basketId: string,
  ): Promise<void> {
    accountUser.basketId = new Types.ObjectId(basketId);
    accountUser.accountStatus = AccountStatus.WAITING_PAYMENT;
    await accountUser.save();
  }

  private async updateUserStatusToActive(
    userId: Types.ObjectId,
  ): Promise<void> {
    const user = await AccountUserModel.findById(userId);
    if (user) {
      user.accountStatus = AccountStatus.ACTIVE;
      await user.save();
    }
  }

  private async createPaymentLink(
    adminUserId: string,
    intendedUserId: string,
    basket: BasketType,
  ): Promise<IPaymentLinkSchema> {
    const paymentLinkData: CreatePaymentLinkInput = {
      userId: new Types.ObjectId(adminUserId),
      value: basket.basketValue,
      billingType: BillingType.BOLETO,
      chargeType: ChargeType.DETACHED,
      dueDateLimitDays: 30,
      name: `Cobrança de criação de conta Ipê ${basket.basketValue}`,
    };

    const paymentLink = await paymentLinkService.createPaymentLinkForUser(
      adminUserId,
      intendedUserId,
      paymentLinkData,
    );

    const billingPaymentLink: IPaymentLinkSchema | null =
      await PaymentLinkModel.findById(paymentLink._id);
    if (!billingPaymentLink) {
      throw new Error(ErrorMessages.PAYMENT_LINK_NOT_FOUND);
    }

    return billingPaymentLink;
  }

  private async sendAccountCreationEmail(
    accountUser: IAccountUserSchema,
    basket: BasketType,
    paymentLink: IPaymentLinkSchema,
    basketId: string,
  ): Promise<void> {
    const basketItemsDetails = await this.getBasketItemsDetails(basketId);

    await MailingHandler.accountCreationEmail({
      basketItems: basketItemsDetails,
      amount: basket.basketValue,
      paymentLink: paymentLink.url,
      name: accountUser.name,
    });
  }

  private async sendPendingDocumentsLinkEmail(user: IAccountUserSchema): Promise<void> {
    // await MailingHandler.pendingDocumentsLinkEmail({
    //   name: accountUser.name,
    // });
  }

  private async getBasketItemsDetails(basketId: string) {
    return await BasketModel.aggregate([
      { $match: { _id: new Types.ObjectId(basketId) } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "basket-items",
          localField: "items",
          foreignField: "_id",
          as: "itemDetails",
        },
      },
      { $unwind: "$itemDetails" },
      {
        $project: {
          name: "$itemDetails.name",
          description: "$itemDetails.description",
        },
      },
    ]);
  }

  private async validateEmailUniqueness(email: string): Promise<void> {
    const existingUser = await AccountUserModel.findOne({ email });
    if (existingUser) {
      throw new Error(ErrorMessages.EMAIL_ALREADY_EXISTS);
    }
  }
}

export const accountUserService = new AccountUserService();
