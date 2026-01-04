import express from "express";
const router = express.Router();
import { uploadFreelancerImage } from "../../controllers/freelancer/freelancer-image.js";
import imageUploadMiddleware from "../../middlewares/image-upload.js";

router.post(
  "/image/upload",
  imageUploadMiddleware.single("image"),
  uploadFreelancerImage
);

export default router;
