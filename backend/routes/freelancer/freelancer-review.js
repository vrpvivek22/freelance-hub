const express = require("express");
const router = express.Router();

const {
  FreelancerReview,
  getFreelancerReviews,
} = require("../../controllers/freelancer/freelancer-review");

router.post("/review", FreelancerReview);
router.get("/review/:freelancerId", getFreelancerReviews);

module.exports = router;
