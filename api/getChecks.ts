import axios from "axios";
import { config } from "./config";

const endpoint = `missingchecks/`;

export default async (token: string | null, id: number) => {
  if (token === null) {
    return false;
  }
  const axios_config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  let response = await axios.get(
    config.url_base + endpoint + id.toString(),
    axios_config
  );
  if (response.status === 200) {
    return response.data;
  } else {
    //todo: somethings wrong
  }
};
