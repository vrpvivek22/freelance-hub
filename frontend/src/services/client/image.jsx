import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function uploadClientImageApi(formData) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/api/v1/client/image/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response?.data;
}
