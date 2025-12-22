import axios from "axios";

export default async function acceptBidApi(bidId) {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `http://localhost:5000/api/v1/client/bid/${bidId}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
