import axios from "axios";

export default async function getFreelancerProjectSearch(search = "") {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://localhost:5000/api/v1/freelancer/search?projectTitle=${encodeURIComponent(
      search
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function getsingleProjectdetails(projectId) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://localhost:5000/api/v1/freelancer/search/${projectId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
