import { QrCodeResolvers } from "./pixStaticQrCode.resolvers";
import { qrCodeTypeDefs } from "./pixStaticQrCode.definitions";

export const pixStaticQrCodeModule = {
  resolvers: QrCodeResolvers,
  typeDefs: qrCodeTypeDefs,
};
