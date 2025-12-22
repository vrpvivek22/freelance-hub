const express = require("express");
const router = express.Router();
const { uploadClientImage } = require("../../controllers/client/client-image");
const imageUploadMiddleware = require("../../middlewares/image-upload");

router.post(
  "/image/upload",
  imageUploadMiddleware.single("image"),
  uploadClientImage
);

module.exports = router;
