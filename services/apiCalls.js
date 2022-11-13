import axios from "axios";
import calls from "./calls";

let listingCancelToken;

export async function getLocation() {
  const res = await calls("get", "states");
  return res;
}

export async function getService() {
  const res = await calls("get", "categories");
  return res;
}

export async function getType(id) {
  const res = await calls("get", `categories/${id}/subscategories`);
  return res;
}

export async function getEducations(url) {
  if (typeof listingCancelToken !== typeof undefined) {
    listingCancelToken.cancel();
  }
  listingCancelToken = axios.CancelToken.source();

  const res = await calls(
    "get",
    url,
    null,
    null,
    null,
    listingCancelToken.token,
  );
  return res;
}
export async function getFilters(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}
export async function detailPageData(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}
export async function getAccessibilityFeature(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}
export async function getServiceFeatures(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}
export async function getCountries(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}

export async function login(url, data) {
  const res = await calls("post", url, data, null, null);
  return res;
}
export async function register(url, data) {
  const res = await calls(
    "post",
    url,
    data,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    null,
  );
  return res;
}

export async function postCV(url, data, header) {
  const res = await calls(
    "PUT",
    url,
    data,
    {
      "Content-Type": "multipart/form-data",
      ...header,
    },
    null,
  );
  return res;
}

export async function getSkills(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}
export async function getAllSalaryScale(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}
export async function getSectors(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}

export async function featuredEducations(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}
export async function featuredJobs(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}
export async function getCandidate(url) {
  const res = await calls("get", url, null, null, null);
  return res;
}

export async function uploadImage(url, data, token) {
  const res = await calls(
    "post",
    url,
    data,
    {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    null,
  );
  return res;
}
export async function getUserDetail(url, token) {
  const res = await calls(
    "get",
    url,
    null,
    {
      Authorization: `Bearer ${token}`,
    },
    null,
  );
  return res;
}
