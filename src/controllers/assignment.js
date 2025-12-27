const {
  listAssignmentsService,
  updateAssignmentService,
  deleteAssignmentService,
  getAssignmentWithSubmissionsService,
  markAssignmentCompletedService,
} = require("../services/assignment.service");
const { publishAssignmentService } = require("../services/assignment.service");
const { createAssignmentService } = require("../services/assignment.service");

async function createAssignment(req, res, next) {
  const assignment = await createAssignmentService({
    ...req.body,
    user: req.user,
  });

  res.data = {
    statusCode: 201,
    message: "Assignment created successfully",
    assignment,
  };

  next();
}

async function publishAssignment(req, res, next) {
  const assignment = await publishAssignmentService({
    assignmentId: req.params.id,
    user: req.user,
  });

  res.data = {
    statusCode: 200,
    message: "Assignment published successfully",
    assignment,
  };

  next();
}

async function listAssignments(req, res, next) {
  const result = await listAssignmentsService({
    user: req.user,
    ...req.query,
  });

  res.data = {
    statusCode: 200,
    message: "Assignments fetched successfully",
    ...result,
  };

  next();
}

async function updateAssignment(req, res, next) {
  const assignment = await updateAssignmentService({
    assignmentId: req.params.id,
    data: req.body,
    user: req.user,
  });

  res.data = {
    statusCode: 200,
    message: "Assignment updated successfully",
    assignment,
  };
  next();
}

async function deleteAssignment(req, res, next) {
  await deleteAssignmentService({
    assignmentId: req.params.id,
    user: req.user,
  });

  res.data = {
    statusCode: 200,
    message: "Assignment deleted successfully",
  };
  next();
}

async function getAssignmentWithSubmissions(req, res, next) {
  const data = await getAssignmentWithSubmissionsService({
    assignmentId: req.params.id,
    user: req.user,
  });

  res.data = {
    statusCode: 200,
    message: "Assignment details fetched successfully",
    assignment: data.assignment,
    submissions: data.submissions,
  };

  next();
}

async function markAssignmentCompleted(req, res, next) {
  const assignment = await markAssignmentCompletedService({
    assignmentId: req.params.id,
    user: req.user,
  });

  res.data = {
    statusCode: 200,
    message: "Assignment marked as completed",
    assignment,
  };
  next();
}

module.exports = {
  createAssignment,
  publishAssignment,
  listAssignments,
  updateAssignment,
  deleteAssignment,
  getAssignmentWithSubmissions,
  markAssignmentCompleted,
};
