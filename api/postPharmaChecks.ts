import axios from "axios";
import { config } from "./config";

const endpoint = `pharmacheck`;

export default async (token: string, pharmacheck: object) => {
  let formData = new FormData();
  let date = new Date(pharmacheck.date);

  formData.append("batch_id", pharmacheck.batch_id.toString());
  formData.append("drugsheet_id", pharmacheck.drugsheet_id.toString());
  formData.append("date", date.toISOString().substr(0, 10));
  formData.append("start", pharmacheck.start?.toString() ?? "");
  formData.append("end", pharmacheck.end?.toString() ?? "");

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
