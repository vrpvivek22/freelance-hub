const expresss = require("express");
const router = expresss.Router();

const login = require("../controllers/auth/login");
const signup = require("../controllers/auth/signup");
const authenticatedUser = require("../middlewares/authentication");
const changePassword = require("../controllers/auth/changepassword");
const { validate } = require("../middlewares/validate");
const { loginSchema, signupSchema } = require("../validation/auth-validation");

router.post("/login", validate(loginSchema), login);
router.post("/signup", validate(signupSchema), signup);
router.patch("/change-password", authenticatedUser, changePassword);

module.exports = router;
