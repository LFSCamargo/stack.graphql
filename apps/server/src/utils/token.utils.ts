import { sign, verify } from "jsonwebtoken";
import { Env } from "../env";

type JWTPayload =
  | {
      type: "dashboard";
      id: string;
      expiresAt?: number;
    }
  | {
      type: "credit";
      id: string;
      expiresAt?: number;
    }
  | {
      type: "account";
      id: string;
      expiresAt?: number;
    };

export const TokenUtility = {
  /**
   * @description - This function is used to generate a JWT Token
   * @param payload - User Data to be stored in the token
   * @returns - JWT Token
   */
  async generateToken(payload: JWTPayload) {
    return `Bearer ${sign(payload, Env.JWT_SECRET)}`;
  },

  /**
   * @description - This function is used to verify the token
   * @param authorization - JWT Token like: Bearer <token>
   * @returns - Email if the token is valid, null otherwise
   */
  async verifyToken(authorization: string) {
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      throw new Error("Invalid token type");
    }
    try {
      const { id, type, expiresAt } = verify(
        token,
        Env.JWT_SECRET,
      ) as JWTPayload;

      if (expiresAt && expiresAt < Date.now()) {
        return null;
      }

      return {
        id,
        type,
      };
    } catch (error) {
      return null;
    }
  },
};
