import axios from "axios";

export default async function calls(method, endpoint, data, headers) {
  const res = await axios({
    method,
    url: process.env.BASE_URL + endpoint,
    data,
    headers,
  });
  return res;
}
