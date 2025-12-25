const express = require("express");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const { sendResponse } = require("../../middlewares/sendResponse");
const { authenticateUser } = require("../../middlewares/verifyAuth");
const { authorizeRoles } = require("../../middlewares/authorizeRoles");
const { USER_ROLES } = require("../../constants");
const {
  submitAssignment,
  getSubmissionsByAssignment,
} = require("../../controllers/submission");
const {
  submitAssignmentValidator,
  getSubmissionsByAssignmentValidator,
} = require("../../validators/submission");
const router = express.Router();

router.post(
  "/:assignmentId",
  authenticateUser,
  authorizeRoles(USER_ROLES.STUDENT),
  submitAssignmentValidator,
  asyncHandler(submitAssignment),
  sendResponse
);

router.get(
  "/:assignmentId",
  authenticateUser,
  authorizeRoles(USER_ROLES.TEACHER),
  getSubmissionsByAssignmentValidator,
  asyncHandler(getSubmissionsByAssignment),
  sendResponse
);

module.exports = router;
