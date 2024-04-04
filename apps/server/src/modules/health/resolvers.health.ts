import { TResolvers } from "../../types";

export const HealthResolvers: TResolvers = {
  Query: {
    health: async () => ({ status: "Server Up And Running" }),
  },
};
