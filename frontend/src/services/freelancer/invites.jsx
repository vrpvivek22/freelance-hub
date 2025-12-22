import axios from "axios";

export default async function GetFreelancerInvitesApi() {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5000/api/v1/freelancer/invitations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
