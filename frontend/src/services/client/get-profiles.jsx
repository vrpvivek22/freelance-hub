import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function getClientProfileSearch(search = "") {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${BASE_URL}/api/v1/client/search?title=${encodeURIComponent(search)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
}

export async function getsingleProfileDetails(id) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/api/v1/client/search/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}
