import axios from "axios";

const ASAAS_API_SANDBOX_URL = process.env.ASAAS_API_SANDBOX_URL;
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

if (!ASAAS_API_SANDBOX_URL || !ASAAS_API_KEY) {
  throw new Error("Asaas API URL and API key are required");
}

export const asaasClient = axios.create({
  baseURL: ASAAS_API_SANDBOX_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "967b15e8-331a-4252-9623-00d6056952f7",
    access_token: ASAAS_API_KEY,
  },
});
