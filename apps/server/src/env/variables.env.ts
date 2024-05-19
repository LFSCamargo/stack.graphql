import * as Dotenv from "dotenv";

Dotenv.config();

export const Env = {
  JWT_SECRET: process.env.JWT_SECRET || "secret-key",
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/ipe-bank",

  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: Number(process.env.SMTP_PORT || 587),
  MAIL_USER: process.env.MAIL_USER || "naorespondaipebank@gmail.com",
  MAIL_PASS: process.env.MAIL_PASS || "ligs xjpr tisb fojg",
};
