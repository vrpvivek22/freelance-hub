import express from "express";
const router = express.Router();

import acceptBid from "../../../controllers/client/bid-status/accepted.js";

router.patch("/:bidId/accept", acceptBid);

export default router;
