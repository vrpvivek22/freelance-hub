import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function createFreelancerProfileApi(body) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/api/v1/freelancer/profile`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}

export async function getFreelancerProfileApi() {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/api/v1/freelancer/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
}

export async function getProfileByUserIdApi(userId) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${BASE_URL}/api/v1/freelancer/profile/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}

export async function updateProfileApi(body) {
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `${BASE_URL}/api/v1/freelancer/profile`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}
