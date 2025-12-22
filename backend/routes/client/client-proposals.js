const express = require("express");
const router = express.Router();

const getProposals = require("../../controllers/client/client-proposals");

router.get("/:projectId", getProposals);

module.exports = router;
