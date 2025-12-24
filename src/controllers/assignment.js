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

module.exports = {
  createAssignment,
  publishAssignment,
};
