import axios from "axios";

export default async function calls(
  method,
  endpoint,
  data,
  headers,
  params,
  cancelToken,
) {
  const env = process.env.NODE_ENV;
  const url =
    env === "development"
      ? process.env.BASE_URL_LOCAL
      : process.env.BASE_URL_UAT;
  const res = await axios({
    method,
    url: url + endpoint,
    data,
    params,
    headers,
    cancelToken: cancelToken && cancelToken,
  });
  return res;
}
