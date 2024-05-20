import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Text,
} from "@react-email/components";
import * as React from "react";

interface TedRequestProps {
  cpf?: string;
  name?: string;
  bankCode?: string;
  agency?: string;
  accountDigit?: string;
  ammount?: number;
  cardNumber?: string;
  date?: string;
}

export const TedRequest = ({
  cpf,
  name,
  bankCode,
  agency,
  accountDigit,
  ammount,
  cardNumber,
  date,
}: TedRequestProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img width={120} src="https://i.imgur.com/KECm39u.png" />
        <Text style={{ ...text, marginBottom: "14px" }}>
          Solicitação de TED
        </Text>

        <Text style={{ ...text, marginBottom: "14px" }}>
          Solicitante: {cardNumber} <br />
          Nome do Favorecido: {name} <br />
          CPF: {cpf} <br />
          Banco: {bankCode} <br />
          Agência: {agency} <br />
          Conta: {accountDigit} <br />
          Valor: {Number(ammount).toFixed(2)} <br />
          Data: {date} <br />
        </Text>

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

TedRequest.PreviewProps = {
  cpf: "12345678900",
  name: "John Doe",
  bankCode: "001",
  agency: "1234",
  accountDigit: "1",
  ammount: 1000,
  cardNumber: "6362 9700 0045 7013",
  date: "2021-09-01",
} as TedRequestProps;

export default TedRequest;

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
