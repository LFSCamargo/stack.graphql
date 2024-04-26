import React from "react";
import { Toaster } from "@/components/ui";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { Router } from "@/router";
import { apolloClient } from "@/clients";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Router />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "ring-1 ring-white/10",
        }}
      />
    </ApolloProvider>
  </React.StrictMode>,
);
