import express from "express";
const router = express.Router();
import {
  Invite,
  getClientInvitations,
} from "../../controllers/client/client-invites.js";

router.get("/invitations", getClientInvitations);
router.post("/invite", Invite);

export default router;
