import crypto from "crypto";
import * as bcrypt from "bcrypt";

export const PasswordUtility = {
  generateTemporaryCode: (): string => {
    return crypto.randomBytes(3).toString("hex");
  },
  /**
   * @description - This function is used to authenticate the user stored password with the plain password
   * @param plainPassword - Plain password from request
   * @param hash - Hashed password from database
   * @returns - Boolean, true if the password is valid, false otherwise
   */
  authenticate: (plainPassword: string, hash: string): boolean =>
    bcrypt.compareSync(plainPassword, hash),

  /**
   * @description - This function is used to encrypt a plain password
   * @param plainPassword  - Plain password from request
   * @returns - Encrypted password
   */
  encryptPassword: (plainPassword: string): string =>
    bcrypt.hashSync(plainPassword, 8),
};
