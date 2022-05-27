const base = "https://api.isnu.ml/";
const all = async () => {
  const response = await fetch(base);
  return await response.json();
};
const post = async (body) => {
  return await fetch(base, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

const remove = async (...ids) => {
  const requests = ids.map((id) => fetch(base + id, { method: "DELETE" }));
  return await Promise.all(requests);
};

export default {
  all,
  post,
  remove,
};
