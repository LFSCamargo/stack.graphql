import { AccountUserModel } from "../../../models/account-user.model";
import { PasswordUtility } from "../../../utils/password.utils";
import { IAccountUserSchema } from "../../../models/account-user.model";
import { CreateAccountUserInput } from "../types/AccountUser.accountUser.types";
import { AccountStatus } from "../enums/accountStatus.enum";
import { BasketModel } from "../../../models";
import { Types } from "mongoose";
import { ErrorMessages } from "../../../utils/errorMessages.enum";
import { BasketType } from '../../basket/types/basket.types';
import { BillingType, ChargeType } from '../../paymentLink/enums/paymentLikns.enum';
import { paymentLinkService } from '../../paymentLink/services/paymentLink.service';
import { CreatePaymentLinkInput } from '../../paymentLink/types/paymentLink.types';

class AccountUserService {
  async preRegisterAccount(
    data: CreateAccountUserInput,
  ): Promise<IAccountUserSchema> {
    try {
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
    const accountUser = await AccountUserModel.findById(intendedUserId);
    if (!accountUser) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    const basket: BasketType | null = await BasketModel.findById(basketId);
    if (!basket) {
      throw new Error(ErrorMessages.BASKET_NOT_FOUND);
    }

    accountUser.basketId = new Types.ObjectId(basketId);
    accountUser.accountStatus = AccountStatus.WAITING_PAYMENT;

    await accountUser.save();

    // Generate charge and send to user (not yet implemented)
    // generatePaymentLink(user);
    
    const paymentLinkData: CreatePaymentLinkInput = {
      userId: new Types.ObjectId(adminUserId),
      value: basket.basketValue,
      billingType: BillingType.BOLETO,
      chargeType: ChargeType.DETACHED,
      dueDateLimitDays: 30,
      name: `Cobrança de criação de conta Ipê ${basket.basketValue}`,
      // callback: {
      //   successUrl: `https://www.ipetown.com.br/account-user/payment-success`,
      // },
    };

   
    const paymentLink = await paymentLinkService.createPaymentLinkForUser(
      adminUserId,
      intendedUserId,
      paymentLinkData
    );

    console.log('paymentLink', paymentLink);
    // const billingPaymentLink: IPaymentLinkSchema | null = await PaymentLinkModel.findById(paymentLink._id);

    // if(!billingPaymentLink) {
    //   throw new Error(ErrorMessages.PAYMENT_LINK_NOT_FOUND);
    // }

    // sendPaymentLinkByEmail(user);

    return accountUser;
  }
}

export const accountUserService = new AccountUserService();
