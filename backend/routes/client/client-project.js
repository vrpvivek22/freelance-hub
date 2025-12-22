const express = require("express");
const router = express.Router();
const { validate } = require("../../middlewares/validate");

const {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  getSingleProject,
  getAllClientProjects,
} = require("../../controllers/client/client-project");
const {
  addProjectSchema,
  updateProjectSchema,
} = require("../../validation/client/project-validation");

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

module.exports = router;
