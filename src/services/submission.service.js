const { ASSIGNMENT_STATUS } = require("../constants");
const { AssignmentModel, SubmissionModel } = require("../models");
const { AppError } = require("../utils/appError");

async function submitAssignmentService({ assignmentId, answer, user }) {
  const assignment = await AssignmentModel.findById(assignmentId);
  if (!assignment) {
    throw new AppError("Assignment not found", 404);
  }

  if (assignment.status !== ASSIGNMENT_STATUS.PUBLISHED) {
    throw new AppError("Assignment is not open for submission", 400);
  }

  if (new Date() > new Date(assignment.dueDate)) {
    throw new AppError("Assignment due date has passed", 400);
  }

  const existingSubmission = await SubmissionModel.findOne({
    assignment: assignmentId,
    student: user._id,
  });

  if (existingSubmission) {
    throw new AppError("You have already submitted this assignment", 409);
  }

  const submission = await SubmissionModel.create({
    assignment: assignmentId,
    student: user._id,
    answer,
  });

  return submission;
}

async function getSubmissionsByAssignmentService({ assignmentId, user }) {
  const assignment = await AssignmentModel.findById(assignmentId);
  if (!assignment) {
    throw new AppError("Assignment not found", 404);
  }

  if (assignment.created_by?.toString() !== user?._id?.toString()) {
    throw new AppError("You are not allowed to view these submissions", 403);
  }

  const submissions = await SubmissionModel.find({
    assignment: assignmentId,
  })
    .populate("student", "name email")
    .sort({ submittedAt: -1 });

  return submissions;
}

async function markSubmissionReviewedService({ submissionId, user }) {
  const submission = await SubmissionModel.findById(submissionId).populate(
    "assignment"
  );

  if (!submission) {
    throw new AppError("Submission not found", 404);
  }

  if (submission.assignment.created_by.toString() !== user._id.toString()) {
    throw new AppError("You are not allowed to review this submission", 403);
  }

  await SubmissionModel.findByIdAndUpdate(submission._id, {
    $set: { reviewed: true },
  });

  return submission;
}

module.exports = {
  submitAssignmentService,
  getSubmissionsByAssignmentService,
  markSubmissionReviewedService,
};
