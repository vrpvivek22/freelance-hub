import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function acceptBidApi(bidId) {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${BASE_URL}/api/v1/client/bid/${bidId}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}
