const { ASSIGNMENT_STATUS } = require("../constants");
const { AssignmentModel } = require("../models");

async function createAssignmentService({ title, description, due_date, user }) {
  const assignment = await AssignmentModel.create({
    title,
    description,
    due_date,
    created_by: user._id,
  });

  return assignment;
}

async function publishAssignmentService({ assignmentId, user }) {
  const assignment = await AssignmentModel.findOneAndUpdate(
    {
      _id: assignmentId,
      created_by: user._id,
      status: ASSIGNMENT_STATUS.DRAFT,
    },
    { $set: { status: ASSIGNMENT_STATUS.PUBLISHED } },
    { new: true }
  );

  if (!assignment) {
    throw new AppError("Assignment not found", 404);
  }

  return assignment;
}

module.exports = {
  createAssignmentService,
  publishAssignmentService,
};
