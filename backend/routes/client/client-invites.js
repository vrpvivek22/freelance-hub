const express = require("express");
const router = express.Router();
const {
  Invite,
  getClientInvitations,
} = require("../../controllers/client/client-invites");

router.get("/invitations", getClientInvitations);
router.post("/invite", Invite);

module.exports = router;
