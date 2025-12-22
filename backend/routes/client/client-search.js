const express = require("express");
const router = express.Router();

const {
  getAllProfiles,
  getProfile,
} = require("../../controllers/client/client-search");

router.get("/", getAllProfiles);
router.get("/:id", getProfile);

module.exports = router;
