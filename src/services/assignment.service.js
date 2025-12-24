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

module.exports = {
  createAssignmentService,
};
