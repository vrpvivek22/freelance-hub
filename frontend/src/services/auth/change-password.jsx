import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const changePassword = async (formData, token) => {
  const response = await axios.patch(
    `${BASE_URL}/api/v1/auth/change-password`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export default changePassword;
