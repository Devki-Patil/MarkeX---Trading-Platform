const BASE_URL = "http://localhost:3002";

export const apiFetch = async (endpoint) => {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL + endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};