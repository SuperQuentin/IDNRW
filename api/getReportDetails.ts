import axios from "axios";

const URL = `http://192.168.178.21:8000/api/myactionsinshift`;

export default async (token: string | null, id: number) => {
  if (token === null) {
    return false;
  }
  const config = {
    params: id,
    headers: { Authorization: `Bearer ${token}` },
  };

  let response = await axios.get(URL, config);
  if (response.status === 200) {
    return response.data;
  } else {
    //todo: somethings wrong
  }
};
