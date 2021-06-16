import axios from "axios";

const URL = `http://192.168.178.21:8000/api/reports`;

export default async (token: string | null) => {
  if (token === null) {
    return false;
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  let response = await axios.get(URL, config);
  if (response.status === 200) {
    return response.data;
  } else {
    //todo: somethings wrong
  }
};
