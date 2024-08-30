import { asaasClient } from "../../../utils/asaasClient.utils";
import { AccountUserModel, PixKeyModel } from "../../../models";
import { StaticQRCodeModel } from "../../../models/static-qr-code.model";

class PixService {
  async createPixKey(userId: string, keyType: string) {
    try {
      const response = await asaasClient.post("/pix/addressKeys", {
        type: keyType,
        sendType: "SEQUENTIALLY",
      });

      const user = await AccountUserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found.");
      }

      const pixKey = new PixKeyModel({
        id: response.data.id,
        key: response.data.key,
        type: keyType || "EVP",
        status: response.data.status,
        dateCreated: new Date(response.data.dateCreated),
        canBeDeleted: response.data.canBeDeleted,
        cannotBeDeletedReason: response.data.cannotBeDeletedReason,
        qrCode: {
          encodedImage: response.data.qrCode.encodedImage,
          payload: response.data.qrCode.payload,
        },
        userMail: user.email,
        accountUserId: user._id,
        asaasId: user.asaasId,
      });

      await pixKey.save();

      return pixKey;
    } catch (error) {
      console.log("error", JSON.stringify(error.response.data, null, 2));
      throw new Error("Failed to create Pix key in Asaas");
    }
  }

  async listAsaasPixKeys(filters: {
    status?: string;
    statusList?: string;
    offset?: number;
    limit?: number;
  }) {
    const params = Object.entries(filters)
      .filter(([_, value]) => value !== undefined)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
      )
      .join("&");
    try {
      const response = await asaasClient.get(`/pix/addressKeys?${params}`);
      return response.data.data || [];
    } catch (error) {
      console.error("Error listing Pix keys in Asaas:", error);
      throw new Error("Failed to list Pix keys in Asaas");
    }
  }

  async listPixKeys(
    filters: {
      status?: string;
      statusList?: string;
      offset?: number;
      limit?: number;
    },
    accountUserId: string,
  ) {
    const query = {
      accountUserId,
      ...(filters.status && { status: filters.status }),
      ...(filters.statusList && {
        status: { $in: filters.statusList.split(",") },
      }),
    };

    const options = {
      skip: filters.offset || 0,
      limit: filters.limit || 100,
    };

    try {
      const pixKeys = await PixKeyModel.find(query, null, options);
      return pixKeys.map((pixKey) => ({
        ...pixKey.toObject(),
        keyType: pixKey.type || "EVP",
        keyValue: pixKey.key || "",
      }));
    } catch (error) {
      console.error("Error listing Pix keys from database:", error);
      throw new Error("Failed to list Pix keys from database");
    }
  }

  async getAsaasPixKey(id: string) {
    try {
      const response = await asaasClient.get(`/pix/addressKeys/${id}`);
      if (!response.data) {
        throw new Error("Pix key not found.");
      }
      return response.data;
    } catch (error) {
      console.error("Error retrieving Pix key from Asaas:", error);
      throw new Error("Failed to retrieve Pix key from Asaas");
    }
  }

  async getPixKeyById(id: string) {
    try {
      const pixKey = await PixKeyModel.findOne({ id: id });
      if (!pixKey) {
        throw new Error("Pix key not found.");
      }
      return pixKey;
    } catch (error) {
      console.error("Error retrieving Pix key from database:", error);
      throw new Error("Failed to retrieve Pix key from database");
    }
  }

  async deletePixKey(id: string) {
    try {
      await asaasClient.delete(`/pix/addressKeys/${id}`);
      const result = await PixKeyModel.findOneAndDelete({ id: id });
      if (!result) {
        throw new Error("Pix key not found in database.");
      }

      return { success: true, message: "Pix key deleted successfully." };
    } catch (error) {
      console.error("Error deleting Pix key:", error.response.data);
      throw new Error("Failed to delete Pix key");
    }
  }

  async createStaticQRCode(data: {
    addressKey: string;
    description: string;
    value?: number;
    format: string;
    expirationDate?: string;
    expirationSeconds?: number;
    allowsMultiplePayments?: boolean;
    externalReference?: string;
    accountUserId: string;
    asaasId: string;
  }) {
    try {
      const response = await asaasClient.post("/pix/qrCodes/static", {
        addressKey: data.addressKey,
        description: data.description,
        value: data.value,
        format: data.format,
        expirationDate: data.expirationDate,
        expirationSeconds: data.expirationSeconds,
        allowsMultiplePayments: data.allowsMultiplePayments ?? true,
        externalReference: data.externalReference,
      });

      if (!response || !response.data) {
        throw new Error("Failed to create static QRCode");
      }

      const qrCodeData = response.data;

      const staticQRCode = new StaticQRCodeModel({
        id: qrCodeData.id,
        encodedImage: qrCodeData.encodedImage,
        payload: qrCodeData.payload,
        allowsMultiplePayments: qrCodeData.allowsMultiplePayments,
        expirationDate: new Date(qrCodeData.expirationDate),
        externalReference: qrCodeData.externalReference,
        dateCreated: new Date(),
        accountUserId: data.accountUserId,
        asaasId: data.asaasId,
      });

      await staticQRCode.save();

      return {
        ...qrCodeData,
        dateCreated: staticQRCode.dateCreated.toISOString(),
        accountUserId: staticQRCode.accountUserId,
        asaasId: staticQRCode.asaasId,
      };
    } catch (error) {
      console.error("Error creating static QRCode:", error.response?.data);
      throw new Error("Failed to create static QRCode");
    }
  }
  async deleteStaticQRCode(id: string) {
    try {
      const response = await asaasClient.delete(`/pix/qrCodes/static/${id}`);

      if (!response || !response.data || !response.data.deleted) {
        throw new Error("Failed to delete static QRCode from Asaas API");
      }

      const result = await StaticQRCodeModel.findOneAndDelete({ id });

      if (!result) {
        throw new Error("Failed to delete static QRCode from database");
      }

      return {
        id,
        deleted: true,
      };
    } catch (error) {
      console.error(
        "Error deleting static QRCode:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to delete static QRCode");
    }
  }
}

export const pixService = new PixService();
