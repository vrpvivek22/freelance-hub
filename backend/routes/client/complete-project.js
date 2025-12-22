const express = require("express");
const router = express.Router();

const completeProject = require("../../controllers/client/complete-project");

router.patch("/:bidId/complete", completeProject);

module.exports = router;
