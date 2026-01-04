import express from "express";
const router = express.Router();
import {
  ClientReview,
  getClientReviews,
} from "../../controllers/client/client-review.js";

router.post("/review", ClientReview);
router.get("/review/:clientId", getClientReviews);

export default router;
