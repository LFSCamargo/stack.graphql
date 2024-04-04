import axios from "axios";
import { Env } from "../env";

export const asaasApi = axios.create({
  baseURL: Env.ASAAS_URI,
});
