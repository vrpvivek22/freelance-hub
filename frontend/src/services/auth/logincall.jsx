import axios from "axios";

export default async function callLoginUserApi(formData) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
}
