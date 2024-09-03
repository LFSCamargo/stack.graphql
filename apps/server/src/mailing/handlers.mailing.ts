import "react";
import nodemailer from "nodemailer";
import { Env } from "../env";
import { render } from "@react-email/render";
import {
  CardPasswordChangeEmail,
  PixRequestEmail,
  RecoverPasswordEmail,
  TedRequest,
  WelcomeEmail,
  AccountCreationEmail,
} from "@ipe.stack/mail";
import { BasketItem } from '../modules/basket/basketItem/types/basketItem.types';

const transporter = nodemailer.createTransport({
  host: Env.SMTP_HOST as string,
  port: Env.SMTP_PORT,
  secure: false,
  auth: {
    user: Env.MAIL_USER as string,
    pass: Env.MAIL_PASS as string,
  },
});

export const MailingHandler = {
  async createUserEmail(
    input: {
      newUserPassword?: string;
      newUserName?: string;
      newUserCardNumber?: string;
    },
    email: string,
  ) {
    const renderedContent = render(
      WelcomeEmail({
        ...input,
      }),
    );

    await transporter.sendMail({
      from: Env.MAIL_USER,
      to: email,
      html: renderedContent,
      subject: "Bem-vindo ao IpeBank, aqui estão os seus dados de acesso",
    });
  },

  async accountCreationEmail(input: {
    basketItems: BasketItem[];
    amount: number;
    paymentLink: string;
    name: string;
  }) {
    const renderedContent = render(
      AccountCreationEmail({
        ...input,
      }),
    );

    await transporter.sendMail({
      from: Env.MAIL_USER,
      html: renderedContent,
      subject: "Ipê Bank - Conta criada com sucesso",
      to: Env.ADMIN_MAIL_DESTINATION,
    });
  },

  async pixRequestEmail(input: {
    cardNumber?: string;
    cpf?: string;
    name?: string;
    pixKey?: string;
    ammount?: number;
    date?: string;
  }) {
    const renderedContent = render(
      PixRequestEmail({
        ...input,
      }),
    );

    await transporter.sendMail({
      from: Env.MAIL_USER,
      html: renderedContent,
      subject: "Ipê Bank - Solicitação de Transferência PIX",
      to: Env.ADMIN_MAIL_DESTINATION,
    });
  },

  async tedRequestEmail(input: {
    cpf?: string;
    name?: string;
    bankCode?: string;
    agency?: string;
    accountDigit?: string;
    ammount?: number;
    cardNumber?: string;
    date?: string;
  }) {
    const renderedContent = render(
      TedRequest({
        ...input,
      }),
    );

    await transporter.sendMail({
      from: Env.MAIL_USER,
      html: renderedContent,
      subject: "Ipê Bank - Solicitação de Transferência TED",
      to: Env.ADMIN_MAIL_DESTINATION,
    });
  },

  async cardPasswordChangeEmail(input: {
    cardNumber?: string;
    oldPassword?: string;
    newPassword?: string;
    name?: string;
  }) {
    const renderedContent = render(
      CardPasswordChangeEmail({
        ...input,
      }),
    );

    await transporter.sendMail({
      from: Env.MAIL_USER,
      html: renderedContent,
      subject: "Ipê Bank - Troca de Senha",
      to: Env.ADMIN_MAIL_DESTINATION,
    });
  },

  async recoverPasswordEmail(
    input: {
      name: string;
      changePasswordCode: string;
    },
    email: string,
  ) {
    const renderedContent = render(
      RecoverPasswordEmail({
        ...input,
      }),
    );

    await transporter.sendMail({
      from: Env.MAIL_USER,
      to: email,
      html: renderedContent,
      subject: "Ipê Bank - Recuperação de Senha",
    });
  },
};
