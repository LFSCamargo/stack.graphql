import { AccountUserModel } from "../../../models/account-user.model";
import { PasswordUtility } from "../../../utils/password.utils";
import { IAccountUserSchema } from "../../../models/account-user.model";
import { CreateAccountUserInput } from "../types/AccountUser.accountUser.types";
import { AccountStatus } from "../enums/accountStatus.enum";
import { BasketModel, IPaymentLinkSchema, PaymentLinkModel } from "../../../models";
import { Types } from "mongoose";
import { ErrorMessages } from "../../../utils/errorMessages.enum";
import { BasketType } from '../../basket/types/basket.types';
import { BillingType, ChargeType } from '../../paymentLink/enums/paymentLikns.enum';
import { paymentLinkService } from '../../paymentLink/services/paymentLink.service';
import { CreatePaymentLinkInput } from '../../paymentLink/types/paymentLink.types';
import { MailingHandler } from '../../../mailing/handlers.mailing';

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

    const paymentLink = await this.createPaymentLink(adminUserId, intendedUserId, basket);

    await this.sendAccountCreationEmail(accountUser, basket, paymentLink, basketId);

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

  private async updateBasketAndStatusAccountUser(accountUser: IAccountUserSchema, basketId: string): Promise<void> {
    accountUser.basketId = new Types.ObjectId(basketId);
    accountUser.accountStatus = AccountStatus.WAITING_PAYMENT;
    await accountUser.save();
  }

  private async createPaymentLink(adminUserId: string, intendedUserId: string, basket: BasketType): Promise<IPaymentLinkSchema> {
    const paymentLinkData: CreatePaymentLinkInput = {
      userId: new Types.ObjectId(adminUserId),
      value: basket.basketValue,
      billingType: BillingType.BOLETO,
      chargeType: ChargeType.DETACHED,
      dueDateLimitDays: 30,
      name: `Cobrança de criação de conta Ipê ${basket.basketValue}`
    };

    const paymentLink = await paymentLinkService.createPaymentLinkForUser(
      adminUserId,
      intendedUserId,
      paymentLinkData
    );

    const billingPaymentLink: IPaymentLinkSchema | null = await PaymentLinkModel.findById(paymentLink._id);
    if (!billingPaymentLink) {
      throw new Error(ErrorMessages.PAYMENT_LINK_NOT_FOUND);
    }

    return billingPaymentLink;
  }

  private async sendAccountCreationEmail(accountUser: IAccountUserSchema, basket: BasketType, paymentLink: IPaymentLinkSchema, basketId: string): Promise<void> {
    const basketItemsDetails = await this.getBasketItemsDetails(basketId);

    await MailingHandler.accountCreationEmail({
      basketItems: basketItemsDetails,
      amount: basket.basketValue,
      paymentLink: paymentLink.url,
      name: accountUser.name,
    });
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
