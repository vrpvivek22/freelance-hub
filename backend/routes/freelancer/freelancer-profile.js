const express = require("express");
const router = express.Router();
const { validate } = require("../../middlewares/validate");
const {
  addProfile,
  updateProfile,
  getProfile,
  getProfileByUserId,
} = require("../../controllers/freelancer/freelancer-profile");
const {
  addProfileSchema,
  updateProfileSchema,
} = require("../../validation/freelancer/profile-validation");

router.get("/:userId", getProfileByUserId);
router
  .route("/")
  .post(validate(addProfileSchema), addProfile)
  .patch(validate(updateProfileSchema), updateProfile)
  .get(getProfile);

module.exports = router;
