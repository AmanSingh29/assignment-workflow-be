const express = require("express");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const { sendResponse } = require("../../middlewares/sendResponse");
const { authenticateUser } = require("../../middlewares/verifyAuth");
const { authorizeRoles } = require("../../middlewares/authorizeRoles");
const { USER_ROLES } = require("../../constants");
const {
  createAssignment,
  publishAssignment,
} = require("../../controllers/assignment");
const {
  createAssignmentValidator,
  publishAssignmentValidator,
} = require("../../validators/assignment");
const router = express.Router();

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
