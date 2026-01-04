import express from "express";
const router = express.Router();
import {
  getAllProfiles,
  getProfile,
} from "../../controllers/client/client-search.js";

router.get("/", getAllProfiles);
router.get("/:id", getProfile);

export default router;
