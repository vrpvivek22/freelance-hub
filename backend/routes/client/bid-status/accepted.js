const express = require("express");
const router = express.Router();

const acceptBid = require("../../../controllers/client/bid-status/accepted");

router.patch("/:bidId/accept", acceptBid);

module.exports = router;
