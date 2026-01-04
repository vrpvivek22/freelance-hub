import express from "express";
const router = express.Router();
import validate from "../../middlewares/validate.js";
import {
  addProfile,
  updateProfile,
  getProfile,
  getProfileByUserId,
} from "../../controllers/freelancer/freelancer-profile.js";
import {
  addProfileSchema,
  updateProfileSchema,
} from "../../validation/freelancer/profile-validation.js";

router.get("/:userId", getProfileByUserId);
router
  .route("/")
  .post(validate(addProfileSchema), addProfile)
  .patch(validate(updateProfileSchema), updateProfile)
  .get(getProfile);

export default router;
