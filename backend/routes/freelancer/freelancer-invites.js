import express from "express";
const router = express.Router();

import { getfreelancerInvitations } from "../../controllers/freelancer/freelancer-invites.js";

router.get("/invitations", getfreelancerInvitations);

export default router;
