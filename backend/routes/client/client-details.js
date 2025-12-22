const express = require("express");
const router = express.Router();
const { validate } = require("../../middlewares/validate");
const {
  addDetailsSchema,
  updateDetailsSchema,
} = require("../../validation/client/details-validation");
const {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getDetailsByUserId,
} = require("../../controllers/client/client-details");

router
  .route("/")
  .get(getDetails)
  .post(validate(addDetailsSchema), addDetails)
  .patch(validate(updateDetailsSchema), updateDetails)
  .delete(deleteDetails);

router.get("/:userId", getDetailsByUserId);
module.exports = router;
