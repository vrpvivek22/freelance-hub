import express from "express";
const router = express.Router();

import login from "../controllers/auth/login.js";
import signup from "../controllers/auth/signup.js";
import authenticatedUser from "../middlewares/authentication.js";
import changePassword from "../controllers/auth/changepassword.js";
import validate from "../middlewares/validate.js";
import { loginSchema, signupSchema } from "../validation/auth-validation.js";

router.post("/login", validate(loginSchema), login);
router.post("/signup", validate(signupSchema), signup);
router.patch("/change-password", authenticatedUser, changePassword);

export default router;
