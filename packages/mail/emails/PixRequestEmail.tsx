import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Text,
} from "@react-email/components";
import * as React from "react";

interface PixRequestEmailProps {
  cardNumber?: string;
  cpf?: string;
  name?: string;
  pixKey?: string;
  ammount?: number;
  date?: string;
}

export const PixRequestEmail = ({
  ammount,
  cardNumber,
  cpf,
  name,
  pixKey,
  date,
}: PixRequestEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img width={120} src="https://i.imgur.com/KECm39u.png" />
        <Text style={{ ...text, marginBottom: "14px" }}>
          Solicitação de PIX
        </Text>

        <Text style={{ ...text, marginBottom: "14px" }}>
          Solicitante: {cardNumber} <br />
          Nome do Favorecido: {name} <br />
          CPF: {cpf} <br />
          Chave PIX: {pixKey} <br />
          Data Valor: {ammount} <br />
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

PixRequestEmail.PreviewProps = {
  ammount: 100,
  cpf: "123.456.789-00",
  name: "John Doe",
  pixKey: "11987654321",
  cardNumber: "6362 9700 0045 7013",
  date: "2021-09-01",
} as PixRequestEmailProps;

export default PixRequestEmail;

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
