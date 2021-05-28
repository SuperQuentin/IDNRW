import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;

const URL = `http://${manifest.debuggerHost.split(":").shift()}:8000/api/bases`;

export default async () => {
  let response = await axios.get(URL);
  return response.data;
};
