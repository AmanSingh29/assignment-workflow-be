const { submitAssignmentService } = require("../services/submission.service");

async function submitAssignment(req, res, next) {
  const submission = await submitAssignmentService({
    assignmentId: req.params.assignmentId,
    answer: req.body.answer,
    user: req.user,
  });

  res.data = {
    statusCode: 201,
    message: "Assignment submitted successfully",
    submission,
  };

  next();
}

module.exports = {
  submitAssignment,
};
