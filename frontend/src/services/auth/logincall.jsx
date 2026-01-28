import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function callLoginUserApi(formData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      formData,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
}
