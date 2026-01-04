import express from "express";
const router = express.Router();

import {
  FreelancerReview,
  getFreelancerReviews,
} from "../../controllers/freelancer/freelancer-review.js";

router.post("/review", FreelancerReview);
router.get("/review/:freelancerId", getFreelancerReviews);

export default router;
