import express from "express";
const router = express.Router();

import { getProposals } from "../../controllers/client/client-proposals.js";

router.get("/:projectId", getProposals);

export default router;
