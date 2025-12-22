import axios from "axios";

export default async function getProjectProposalApi(projectId) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:5000/api/v1/client/project/proposals/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
