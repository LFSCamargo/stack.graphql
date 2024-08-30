import { AccountUserModel } from "../../../models/account-user.model";
import { PasswordUtility } from "../../../utils/password.utils";
import { IAccountUserSchema } from "../../../models/account-user.model";
import { CreateAccountUserInput } from "../types/AccountUser.accountUser.types";
import { AccountStatus } from "../enums/accountStatus.enum";
import { BasketModel } from "../../../models";
import { Types } from "mongoose";

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

  async checkPendingStatus(email: string): Promise<string> {
    const user = await AccountUserModel.findOne({ email });
    if (user && user.accountStatus === AccountStatus.PENDING) {
      return "The benefits and amounts for opening the account for this user have not yet been selected.";
    }
    return "User can proceed with login.";
  }

  async linkBasketToUser(
    userId: string,
    basketId: string,
  ): Promise<IAccountUserSchema> {
    const user = await AccountUserModel.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const basket = await BasketModel.findById(basketId);
    if (!basket) {
      throw new Error("Basket not found.");
    }

    user.basketId = new Types.ObjectId(basketId);
    user.accountStatus = AccountStatus.WAITING_PAYMENT;

    await user.save();

    // Generate charge and send to user (not yet implemented)
    // generateCharge(user);
    // sendChargeSlip(user);

    return user;
  }
}

export const accountUserService = new AccountUserService();
