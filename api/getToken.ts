import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;

const URL = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:8000/api/gettoken`;

console.log(URL);

export default async (initials: string, password: string) => {
  let response = await axios.post(URL, {
    initials: initials,
    password: password,
  });

  return response.data;
};
