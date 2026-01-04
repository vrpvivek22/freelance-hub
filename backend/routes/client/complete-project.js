import express from "express";
const router = express.Router();

import { completeProject } from "../../controllers/client/complete-project.js";

router.patch("/:bidId/complete", completeProject);

export default router;
