import axios from "axios";

export default async function calls(method, endpoint, data, headers, params) {
  const res = await axios({
    method,
    url: process.env.BASE_URL + endpoint,
    data,
    params,
    headers,
  });
  return res;
}
