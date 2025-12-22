import axios from "axios";

export default async function ClientReviewApi(body) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/v1/client/review",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function getClientReviewsApi(clientId) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://localhost:5000/api/v1/client/review/${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
