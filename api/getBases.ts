import axios from "axios";

const URL = "http://127.0.0.1:8000/api/bases";

export default async () => {
  let response = await axios.get(URL);
  return response.data;
};
