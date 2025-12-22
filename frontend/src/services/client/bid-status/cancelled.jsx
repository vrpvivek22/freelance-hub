import axios from "axios";

export default async function cancelBidApi(bidId) {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `http://localhost:5000/api/v1/client/bid/${bidId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
