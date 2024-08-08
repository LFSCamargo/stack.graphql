import { asaasClient } from "../../../utils/asaasClient.utils";
import { PixKeyModel } from "../../../models/PixKey.model";

class PixService {
  async createPixKey(accountUserId: string, keyType: string, keyValue: string) {
    try {
      const response = await asaasClient.post("/pix/keys", {
        keyType,
        keyValue,
      });

      const pixKey = new PixKeyModel({
        keyType,
        keyValue,
        accountUserId,
        asaasKeyId: response.data.id,
        status: response.data.status,
        dateCreated: new Date(response.data.dateCreated),
        canBeDeleted: response.data.canBeDeleted,
        cannotBeDeletedReason: response.data.cannotBeDeletedReason,
        qrCode: {
          encodedImage: response.data.qrCode.encodedImage,
          payload: response.data.qrCode.payload,
        },
      });

      await pixKey.save();

      return pixKey;
    } catch (error) {
      console.error("Error creating Pix key in Asaas:", error);
      throw new Error("Failed to create Pix key in Asaas");
    }
  }
  async getPixKeyFromAsaas(asaasKeyId: string) {
    try {
      const response = await asaasClient.get(`/pix/addressKeys/${asaasKeyId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Pix key from Asaas:", error);
      throw new Error("Failed to fetch Pix key from Asaas");
    }
  }

  async listPixKeysFromAsaas() {
    try {
      const response = await asaasClient.get("/pix/addressKeys");
      return response.data;
    } catch (error) {
      console.error("Error fetching Pix keys from Asaas:", error);
      throw new Error("Failed to fetch Pix keys from Asaas");
    }
  }

  async deletePixKey(accountUserId: string, pixKeyId: string) {
    try {
      const pixKey = await PixKeyModel.findOne({
        _id: pixKeyId,
        accountUserId,
      });
      if (!pixKey) {
        throw new Error("Pix key not found.");
      }

      // Delete the Pix key from Asaas
      await asaasClient.delete(`/pix/addressKeys/${pixKey.asaasKeyId}`);

      // Delete the Pix key from the database
      await PixKeyModel.deleteOne({ _id: pixKeyId });

      return true;
    } catch (error) {
      console.error("Error deleting Pix key:", error);
      throw new Error("Failed to delete Pix key");
    }
  }

  async createQrCode(input: {
    addressKey: string;
    description: string;
    value?: number;
    format: string;
    expirationDate?: string;
    expirationSeconds?: number;
    allowsMultiplePayments?: boolean;
    externalReference?: string;
  }) {
    try {
      const response = await asaasClient.post("/pix/qrCodes/static", input);
      return response.data;
    } catch (error) {
      console.error("Error creating QR code in Asaas:", error);
      throw new Error("Failed to create QR code in Asaas");
    }
  }
}

export const pixService = new PixService();
