import * as Dotenv from "dotenv";

Dotenv.config();

export const Env = {
  JWT_SECRET: process.env.JWT_SECRET || "secret-key",
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/ipe-bank",
  ASAAS_URI: process.env.ASAAS_URI || "https://sandbox.asaas.com/api/v3",
};
