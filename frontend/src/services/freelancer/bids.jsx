import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function placeBidApi(projectId, body) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/api/v1/freelancer/bid/${projectId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}

export async function getAllbidsApi() {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/api/v1/freelancer/bid`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response?.data;
}

export async function getBidsApi(freelancerId) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/api/v1/freelancer/bid/${freelancerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response?.data;
}

export async function deleteBidApi(bidId) {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${BASE_URL}/api/v1/freelancer/bid/${bidId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response?.data;
}

export async function updateBidApi(projectId, formData) {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${BASE_URL}/api/v1/freelancer/bid/${projectId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response?.data;
}
