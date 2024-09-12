export * from "./types/accountDocumments.types";
import { accountDocumentsResolvers } from "./resolvers.accountDocuments";
import { AccountDocumentsDefinitions } from "./definitions.accountDocuments";

export const AccountDocumentsModule = {
  resolvers: accountDocumentsResolvers,
  typeDefs: AccountDocumentsDefinitions,
};
