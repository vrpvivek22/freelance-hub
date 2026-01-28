import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function createClientDetailsApi(body) {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${BASE_URL}/api/v1/client/details`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
}

export async function getClientDetailsApi() {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/api/v1/client/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
}

export async function getDetailsByUserIdApi(userId) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/api/v1/client/details/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}

export async function updateDetailsApi(body) {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${BASE_URL}/api/v1/client/details`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}
