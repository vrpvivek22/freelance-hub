import axios from "axios";

export default async function getClientProfileSearch(search = "") {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:5000/api/v1/client/search?title=${encodeURIComponent(
      search
    )}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}

export async function getsingleProfileDetails(id) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://localhost:5000/api/v1/client/search/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
