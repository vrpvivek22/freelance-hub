import axios from "axios";

export default async function createFreelancerProfileApi(body) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/v1/freelancer/profile",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function getFreelancerProfileApi() {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:5000/api/v1/freelancer/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function getProfileByUserIdApi(userId) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:5000/api/v1/freelancer/profile/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function updateProfileApi(body) {
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    "http://localhost:5000/api/v1/freelancer/profile",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
