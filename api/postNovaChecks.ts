import axios from "axios";
import { config } from "./config";

const endpoint = `novacheck`;

export default async (token: string, novacheck: object) => {
  let formData = new FormData();
  let date = new Date(novacheck.date);

  formData.append("nova_id", novacheck.nova_id.toString());
  formData.append("drug_id", novacheck.drug_id.toString());
  formData.append("drugsheet_id", novacheck.drugsheet_id.toString());
  formData.append("date", date.toISOString().substr(0, 10));
  formData.append("start", novacheck.start?.toString() ?? "");
  formData.append("end", novacheck.end?.toString() ?? "");

  let response = await axios({
    method: "POST",
    url: config.url_base + endpoint,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
