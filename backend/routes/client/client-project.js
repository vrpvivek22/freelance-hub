import express from "express";
const router = express.Router();
import validate from "../../middlewares/validate.js";
import {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  getSingleProject,
  getAllClientProjects,
} from "../../controllers/client/client-project.js";

import {
  addProjectSchema,
  updateProjectSchema,
} from "../../validation/client/project-validation.js";

router
  .route("/")
  .get(getAllProjects)
  .post(validate(addProjectSchema), addProject);
router
  .route("/:projectId")
  .get(getSingleProject)
  .patch(validate(updateProjectSchema), updateProject)
  .delete(deleteProject);

router.get("/all/:clientId", getAllClientProjects);

export default router;
