const express = require("express");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const { sendResponse } = require("../../middlewares/sendResponse");
const { authenticateUser } = require("../../middlewares/verifyAuth");
const { authorizeRoles } = require("../../middlewares/authorizeRoles");
const { USER_ROLES } = require("../../constants");
const {
  createAssignment,
  publishAssignment,
  listAssignments,
} = require("../../controllers/assignment");
const {
  createAssignmentValidator,
  publishAssignmentValidator,
  listAssignmentsValidator,
} = require("../../validators/assignment");
const router = express.Router();

router.get(
  "/",
  authenticateUser,
  listAssignmentsValidator,
  asyncHandler(listAssignments),
  sendResponse
);

router.post(
  "/create",
  authenticateUser,
  authorizeRoles(USER_ROLES.TEACHER),
  createAssignmentValidator,
  asyncHandler(createAssignment),
  sendResponse
);

router.patch(
  "/publish/:id",
  authenticateUser,
  authorizeRoles(USER_ROLES.TEACHER),
  publishAssignmentValidator,
  asyncHandler(publishAssignment),
  sendResponse
);

module.exports = router;
