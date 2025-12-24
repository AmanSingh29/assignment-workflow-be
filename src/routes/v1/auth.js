const express = require("express");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const { handleSignup } = require("../../controllers/auth");
const { sendResponse } = require("../../middlewares/sendResponse");
const { signupValidator } = require("../../validators/auth");
const router = express.Router();

router.post(
  "/signup",
  signupValidator,
  asyncHandler(handleSignup),
  sendResponse
);

module.exports = router;
