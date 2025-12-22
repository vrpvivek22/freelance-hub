const express = require("express");
const router = express.Router();

const {
  ClientReview,
  getClientReviews,
} = require("../../controllers/client/client-review");

router.post("/review", ClientReview);
router.get("/review/:clientId", getClientReviews);

module.exports = router;
