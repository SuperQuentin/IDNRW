import axios from "axios";
import { config } from "./config";

const endpoint = `bases`;

export default async () => {
  let response = await axios.get(config.url_base + endpoint);
  if (response.status === 200) {
    return response.data;
  } else {
    //todo: somethings wrong
  }
};
