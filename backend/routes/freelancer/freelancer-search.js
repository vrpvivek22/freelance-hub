const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProject,
} = require("../../controllers/freelancer/freelancer-search");

router.get("/", getAllProjects);
router.get("/:projectId", getProject);
module.exports = router;
