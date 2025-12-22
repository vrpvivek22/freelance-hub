import axios from "axios";

export default async function ClientInviteApi({ projectId, freelancerId }) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/v1/client/invite",
    {
      projectId,
      freelancerId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function GetClientInvitesApi() {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5000/api/v1/client/invitations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
