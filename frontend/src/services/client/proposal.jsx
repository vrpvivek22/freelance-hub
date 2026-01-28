import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function getProjectProposalApi(projectId) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${BASE_URL}/api/v1/client/project/proposals/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}
