import express from "express";
const router = express.Router();

import cancelBid from "../../../controllers/client/bid-status/cancelled.js";

router.patch("/:bidId/cancel", cancelBid);

export default router;
