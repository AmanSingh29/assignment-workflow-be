const express = require("express");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const { sendResponse } = require("../../middlewares/sendResponse");
const { authenticateUser } = require("../../middlewares/verifyAuth");
const { authorizeRoles } = require("../../middlewares/authorizeRoles");
const { USER_ROLES } = require("../../constants");
const { submitAssignment } = require("../../controllers/submission");
const { submitAssignmentValidator } = require("../../validators/submission");
const router = express.Router();

router.post(
  "/:assignmentId",
  authenticateUser,
  authorizeRoles(USER_ROLES.STUDENT),
  submitAssignmentValidator,
  asyncHandler(submitAssignment),
  sendResponse
);

module.exports = router;
