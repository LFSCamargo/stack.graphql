import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Text,
} from "@react-email/components";
import * as React from "react";
import { SendedDocument } from '../../../apps/server/src/modules/accountDocuments/types/accountDocumments.types';

interface AccountDocumentsEmailProps {
  name: string;
  documents: SendedDocument[];
}

export const AccountDocumentsEmail = ({
  name,
  documents,
}: AccountDocumentsEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img width={120} src="https://i.imgur.com/KECm39u.png" />
        <Text style={{ ...text, marginBottom: "14px" }}>
          Bem-vindo, {name}!
        </Text>
        <Text style={{ ...text, marginBottom: "0px" }}>
          Aqui estão os links para realizar o envio dos documentos da sua conta.
        </Text>
        <Text style={{ ...text, marginBottom: "20px" }}>
          Documentos: 
        </Text>
        <ul style={listStyle}>
          {documents.map((document) => (
            <li key={document.type} style={listItemStyle}>
              <a style={button} href={document.onboardingUrl}>
                {document.type}
              </a>
            </li>
          ))}
        </ul>
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

AccountDocumentsEmail.PreviewProps = {
  name: "John Doe",
  documents: [
    {
      type: "Documento 1",
      onboardingUrl: "https://onboarding-url.com",
    },
    {
      type: "Documento 2",
      onboardingUrl: "https://onboarding-url.com",
    },
  ],
} as AccountDocumentsEmailProps;

export default AccountDocumentsEmail;

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

const listStyle = {
  listStyleType: "none",
  padding: 0,
};

const listItemStyle = {
  padding: "15px",
};