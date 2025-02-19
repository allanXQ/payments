const router = require("express").Router();
const { formValidate } = require("../../middleware");
const {
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
  logout,
  googleOAuth,
} = require("../../controllers/auth");
const {
  regSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  googleOAuthSchema,
} = require("../../yupschemas");

const { errorHOC } = require("../../utils");

// routes
router.post("/register", formValidate(regSchema), errorHOC(register));
router.post("/login", formValidate(loginSchema), errorHOC(login));
router.post(
  "/forgot-password",
  formValidate(forgotPasswordSchema),
  errorHOC(forgotPassword)
);
router.post(
  "/reset-password/:token",
  formValidate(resetPasswordSchema),
  errorHOC(resetPassword)
);
router.post("/refresh-token", errorHOC(refreshToken));
router.post("/logout", errorHOC(logout));

router.post("/google", formValidate(googleOAuthSchema), errorHOC(googleOAuth));

module.exports = router;
