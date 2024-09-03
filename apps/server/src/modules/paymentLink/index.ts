import { PaymentLinkResolvers } from "./resolvers.paymentLink";
import { PaymentLinkDefinitions } from "./definitions.paymentLink";

export const PaymentLinkModule = {
  resolvers: PaymentLinkResolvers,
  typeDefs: PaymentLinkDefinitions,
};
