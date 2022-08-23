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
