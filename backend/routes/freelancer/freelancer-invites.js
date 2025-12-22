const express = require("express");
const router = express.Router();

const getfreelancerInvitations = require("../../controllers/freelancer/freelancer-invites");

router.get("/invitations", getfreelancerInvitations);

module.exports = router;
