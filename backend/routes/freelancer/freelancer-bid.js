import express from "express";
const router = express.Router();
import validate from "../../middlewares/validate.js";
import {
  bidSchema,
  updateBidSchema,
} from "../../validation/freelancer/bids-validation.js";

import {
  bidProject,
  updateBid,
  getMyBidProjects,
  getBidProjects,
  withdrawBid,
} from "../../controllers/freelancer/freelancer-bid.js";

router.get("/", getMyBidProjects);
router.get("/:freelancerId", getBidProjects);
router
  .route("/:projectId")
  .post(validate(bidSchema), bidProject)
  .patch(validate(updateBidSchema), updateBid);
router.delete("/:bidId", withdrawBid);

export default router;
