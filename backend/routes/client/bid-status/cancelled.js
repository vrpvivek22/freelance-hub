const express = require("express");
const router = express.Router();

const cancelBid = require("../../../controllers/client/bid-status/cancelled");

router.patch("/:bidId/cancel", cancelBid);

module.exports = router;
