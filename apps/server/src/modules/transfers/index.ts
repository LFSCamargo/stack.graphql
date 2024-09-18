export * from "./types/transfer.types";
import { transferResolvers } from "./resolvers.transfer";
import { TransferDefinitions } from "./definitions.transfer";

export const TransferModule = {
  resolvers: transferResolvers,
  typeDefs: TransferDefinitions,
};
