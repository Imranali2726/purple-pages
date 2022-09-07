import axios from "axios";

export default async function calls(method, endpoint, data, headers, params) {
  const env = process.env.NODE_ENV;
  const url =
    env === "development" ? process.env.BASE_URL_UAT : process.env.BASE_URL_UAT;
  const res = await axios({
    method,
    url: url + endpoint,
    data,
    params,
    headers,
  });
  return res;
}
