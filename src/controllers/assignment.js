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

module.exports = {
  createAssignment,
};
