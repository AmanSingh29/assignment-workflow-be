const {
  submitAssignmentService,
  getSubmissionsByAssignmentService,
  markSubmissionReviewedService,
} = require("../services/submission.service");

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

async function getSubmissionsByAssignment(req, res, next) {
  const submissions = await getSubmissionsByAssignmentService({
    assignmentId: req.params.assignmentId,
    user: req.user,
  });

  res.data = {
    statusCode: 200,
    message: "Submissions fetched successfully",
    submissions,
  };

  next();
}

async function markSubmissionReviewed(req, res, next) {
  const submission = await markSubmissionReviewedService({
    submissionId: req.params.id,
    user: req.user,
  });

  res.data = {
    statusCode: 200,
    message: "Submission marked as reviewed",
    submission,
  };
  next();
}

module.exports = {
  submitAssignment,
  getSubmissionsByAssignment,
  markSubmissionReviewed,
};
