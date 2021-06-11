import axios from "axios";
import Constants from "expo-constants";

const URL = `http://172.17.102.239:8000/api/gettoken`;

export default async (initials: string, password: string) => {
  let formData = new FormData();
  formData.append("initials", initials);
  formData.append("password", password);

  let response = await axios({
    method: "POST",
    url: URL,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (response.status === 200) {
    return response.data.token;
  } else {
    console.log("oups");
    //todo: somethings wrong
  }
  return false;
};
