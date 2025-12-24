const express = require("express");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const { handleSignup, handleLogin } = require("../../controllers/auth");
const { sendResponse } = require("../../middlewares/sendResponse");
const { signupValidator, loginValidator } = require("../../validators/auth");
const router = express.Router();

router.post(
  "/signup",
  signupValidator,
  asyncHandler(handleSignup),
  sendResponse
);

router.post("/login", loginValidator, asyncHandler(handleLogin), sendResponse);

module.exports = router;
