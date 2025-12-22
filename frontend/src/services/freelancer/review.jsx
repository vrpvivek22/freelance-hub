import axios from "axios";

export default async function FreelancerReviewApi(reviewData) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/v1/freelancer/review",
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}

export async function getFreelancerReviewsApi(freelancerId) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://localhost:5000/api/v1/freelancer/review/${freelancerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
}
