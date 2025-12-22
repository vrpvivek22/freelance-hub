import axios from "axios";

const changePassword = async (formData, token) => {
  const response = await axios.patch(
    "http://localhost:5000/api/v1/auth/change-password",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default changePassword;
