import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Text,
} from "@react-email/components";
import * as React from "react";

interface CardPasswordChangeEmailProps {
  cardNumber?: string;
  oldPassword?: string;
  newPassword?: string;
  name?: string;
}

export const CardPasswordChangeEmail = ({
  cardNumber,
  oldPassword,
  newPassword,
  name,
}: CardPasswordChangeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img width={120} src="https://i.imgur.com/KECm39u.png" />
        <Text style={{ ...text, marginBottom: "14px" }}>
          Solicitação de Troca de Senha
        </Text>

        <Text style={{ ...text, marginBottom: "14px" }}>
          Solicitante: {cardNumber} <br />
          Nome do Favorecido: {name} <br />
        </Text>
        <Text style={{ ...text, marginBottom: "10px" }}>Senha Antiga: </Text>
        <code style={code}>{oldPassword}</code>
        <Text style={{ ...text, marginBottom: "10px" }}>Nova Senha: </Text>
        <code style={code}>{newPassword}</code>
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

CardPasswordChangeEmail.PreviewProps = {
  cardNumber: "6362 9700 0045 7013",
  newPassword: "123456",
  oldPassword: "123333",
  name: "John Doe",
} as CardPasswordChangeEmailProps;

export default CardPasswordChangeEmail;

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

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
