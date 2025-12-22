const express = require("express");
const router = express.Router();
const { validate } = require("../../middlewares/validate");
const {
  bidSchema,
  updateBidSchema,
} = require("../../validation/freelancer/bids-validation");
const {
  bidProject,
  updateBid,
  getMyBidProjects,
  getBidProjects,
  withdrawBid,
} = require("../../controllers/freelancer/freelancer-bid");

router.get("/", getMyBidProjects);
router.get("/:freelancerId", getBidProjects);
router
  .route("/:projectId")
  .post(validate(bidSchema), bidProject)
  .patch(validate(updateBidSchema), updateBid);
router.delete("/:bidId", withdrawBid);
module.exports = router;
