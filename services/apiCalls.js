import calls from "./calls";

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

// export async function getSearchResults(params) {
//   const res = await calls("get", "search", null, null, params);
//   return res;
// }

export async function getEducations(url) {
  const res = await calls("get", url, null, null, null);
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
