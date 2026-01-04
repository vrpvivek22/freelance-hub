import express from "express";
const router = express.Router();

import { uploadClientImage } from "../../controllers/client/client-image.js";
import imageUploadMiddleware from "../../middlewares/image-upload.js";

router.post(
  "/image/upload",
  imageUploadMiddleware.single("image"),
  uploadClientImage
);

export default router;
