import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function ClientReviewApi(body) {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${BASE_URL}/api/v1/client/review`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
}

export async function getClientReviewsApi(clientId) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/api/v1/client/review/${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}
