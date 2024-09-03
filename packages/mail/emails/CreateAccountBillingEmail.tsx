import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

interface AccountCreationEmailProps {
  name: string;
  amount: number;
  paymentLink: string;
}

export const AccountCreationEmail = ({
  name,
  amount,
  paymentLink,
}: AccountCreationEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img width={120} src="https://i.imgur.com/KECm39u.png" />
        <Text style={{ ...text, marginBottom: "14px" }}>
          Bem-vindo, {name}!
        </Text>
        <Text style={{ ...text, marginBottom: "0px" }}>
          Estamos felizes em tê-lo conosco. Abaixo estão os detalhes da sua
          conta e os benefícios que você terá:
        </Text>
        <Text style={{ ...text, marginBottom: "20px" }}>
          Valor da cobrança: R$ {Number(amount).toFixed(2)}
        </Text>
        <a style={button} href={paymentLink}>
          Pagar Agora
        </a>
        <br />
        <br />
        <Text
          style={{
            ...footer,
            fontStyle: "italic",
          }}
        >
          Uma plataforma digital capaz de oferecer uma boa experiência ao
          utilizador, para que este possa selecionar os benefícios que melhor
          atendem às suas necessidades individuais, sejam estas em relação à
          saúde ou ao seu bem-estar. - Ipê Bank
        </Text>
      </Container>
    </Body>
  </Html>
);

AccountCreationEmail.PreviewProps = {
  name: "John Doe",
  amount: 1000,
  paymentLink: "https://payment-link.com",
} as AccountCreationEmailProps;

export default AccountCreationEmail;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  paddingTop: "24px",
  margin: "0 auto",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const button = {
  backgroundColor: "#000",
  color: "#ffffff",
  padding: "10px 20px",
  textDecoration: "none",
  borderRadius: "10px",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};
