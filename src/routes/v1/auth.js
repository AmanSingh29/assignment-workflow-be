const express = require("express");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const { handleSignup } = require("../../controllers/auth");
const { sendResponse } = require("../../middlewares/sendResponse");
const router = express.Router();

router.post("/signup", asyncHandler(handleSignup), sendResponse);

module.exports = router;
