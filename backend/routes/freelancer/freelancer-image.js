const express = require("express");
const router = express.Router();
const {
  uploadFreelancerImage,
} = require("../../controllers/freelancer/freelancer-image");
const imageUploadMiddleware = require("../../middlewares/image-upload");

router.post(
  "/image/upload",
  imageUploadMiddleware.single("image"),
  uploadFreelancerImage
);

module.exports = router;
