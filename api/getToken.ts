import axios from "axios";
import { config } from "./config";

const endpoint = `gettoken`;

export default async (initials: string, password: string) => {
  let formData = new FormData();
  formData.append("initials", initials);
  formData.append("password", password);

  let response = await axios({
    method: "POST",
    url: config.url_base + endpoint,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response;
};
