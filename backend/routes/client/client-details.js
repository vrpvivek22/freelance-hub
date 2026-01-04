import express from "express";
const router = express.Router();
import validate from "../../middlewares/validate.js";
import {
  addDetailsSchema,
  updateDetailsSchema,
} from "../../validation/client/details-validation.js";
import {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getDetailsByUserId,
} from "../../controllers/client/client-details.js";

router
  .route("/")
  .get(getDetails)
  .post(validate(addDetailsSchema), addDetails)
  .patch(validate(updateDetailsSchema), updateDetails)
  .delete(deleteDetails);

router.get("/:userId", getDetailsByUserId);

export default router;
