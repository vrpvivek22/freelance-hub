import express from "express";
const router = express.Router();

import {
  getAllProjects,
  getProject,
} from "../../controllers/freelancer/freelancer-search.js";

router.get("/", getAllProjects);
router.get("/:projectId", getProject);

export default router;
