const express = require("express");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const { sendResponse } = require("../../middlewares/sendResponse");
const { authenticateUser } = require("../../middlewares/verifyAuth");
const { authorizeRoles } = require("../../middlewares/authorizeRoles");
const { USER_ROLES } = require("../../constants");
const { createAssignment } = require("../../controllers/assignment");
const { createAssignmentValidator } = require("../../validators/assignment");
const router = express.Router();

router.post(
  "/create",
  authenticateUser,
  authorizeRoles(USER_ROLES.TEACHER),
  createAssignmentValidator,
  asyncHandler(createAssignment),
  sendResponse
);

module.exports = router;
