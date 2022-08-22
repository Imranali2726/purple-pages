import axios from "axios";

export default function calls(method, endpoint, data, headers) {
  const res = axios({
    method,
    url: process.env.BASE_URL + endpoint,
    data,
    headers,
  });
  return res;
}
