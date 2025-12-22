import axios from "axios";

export default async function uploadClientImageApi(formData) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/v1/client/image/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response?.data;
}
