import axios from "axios";
import { config } from "./config";

const endpoint = `confirmworkplan`;

export default async (token: string, workplan: object) => {
  let formData = new FormData();

  formData.append("id", workplan.worktime_id.toString());
  formData.append("confirmation", workplan.confirmation.toString());
  if (workplan.confirmation == 0 && workplan.reason != null)
    formData.append("reason", workplan.reason.toString());

  console.log(formData);

  let response = await axios({
    method: "POST",
    url: config.url_base + endpoint,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
};
