import axios from "axios";
import { getAPIUrl } from "./utils";

export default async function calls(
  method,
  endpoint,
  data,
  headers,
  params,
  cancelToken,
) {
  const url = getAPIUrl();

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
