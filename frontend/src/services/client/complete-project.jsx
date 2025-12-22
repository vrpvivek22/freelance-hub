import axios from "axios";

export default async function completeProjectApi(bidId) {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `http://localhost:5000/api/v1/client/project/${bidId}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
