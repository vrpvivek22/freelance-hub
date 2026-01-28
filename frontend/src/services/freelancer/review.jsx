import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function FreelancerReviewApi(reviewData) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/api/v1/freelancer/review`,
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}

export async function getFreelancerReviewsApi(freelancerId) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/api/v1/freelancer/review/${freelancerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response?.data;
}
