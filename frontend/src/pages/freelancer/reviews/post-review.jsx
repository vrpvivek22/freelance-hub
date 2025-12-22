import { useState } from "react";
import FreelancerReviewApi from "@/services/freelancer/review";
import FreelancerRating from "../ratings/post-ratings";

function PostFreelancerReview({ projectId, clientId, onClose, onReviewed }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();

    const reviewData = {
      rating,
      reviewText,
      clientId,
      projectId,
    };
    await FreelancerReviewApi(reviewData);
    if (onReviewed) onReviewed();
    onClose();
  }

  return (
    <div className="flex fixed inset-0 items-center justify-center bg-black/40 backdrop-blur-[2px] z-200">
      <div className="flex flex-col relative bg-gray-50 rounded-lg dark:bg-gray-800 p-8 shadow-lg w-[700px] text-centre">
        <FreelancerRating onChange={(value) => setRating(value)} />
        <label>Review</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="post your review"
          className="border-[0.2px] my-4 border-gray-400 px-3 py-1.5 h-34 resize-none hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
        />
        <div className="flex flex-row space-x-6">
          <button
            disabled={!reviewText.trim()}
            className={`w-full py-2 rounded font-semibold text-white
              ${
                reviewText.trim()
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            onClick={handleSubmit}
          >
            Submit
          </button>

          <button
            className="bg-red-500 text-white w-full font-semibold hover:bg-red-600 cursor-pointer rounded py-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        <div>
          <button
            className=" text-gray-400 hover:text-gray-700 font-semibold absolute right-0 top-0 px-4 py-2 cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostFreelancerReview;
