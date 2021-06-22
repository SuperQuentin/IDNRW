import axios from "axios";
import { config } from "./config";

const endpoint = `unconfirmedworkplans/`;

export default async (token: string | null) => {
  if (token === null) {
    return false;
  }
  const axios_config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  let response = await axios.get(config.url_base + endpoint, axios_config);
  return response;
};
