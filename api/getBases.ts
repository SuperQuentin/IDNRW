import axios from "axios";

const URL = `http://172.17.102.239:8000/api/bases`;

export default async () => {
  let response = await axios.get(URL);
  if (response.status === 200) {
    return response.data;
  } else {
    //todo: somethings wrong
  }
};
