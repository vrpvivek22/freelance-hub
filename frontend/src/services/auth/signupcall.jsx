import axios from "axios";

export default async function callSignUpUserApi(formData) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/signup",
      formData
    );
    return response?.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
}
