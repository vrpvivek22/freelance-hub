import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function getFreelancerProjectSearch(search = "") {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/api/v1/freelancer/search?projectTitle=${encodeURIComponent(
      search,
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}

export async function getsingleProjectdetails(projectId) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/api/v1/freelancer/search/${projectId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}
