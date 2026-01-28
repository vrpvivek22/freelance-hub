import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function ClientInviteApi({ projectId, freelancerId }) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/api/v1/client/invite`,
    {
      projectId,
      freelancerId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}

export async function GetClientInvitesApi() {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/api/v1/client/invitations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
}
