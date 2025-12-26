const { ASSIGNMENT_STATUS, SORT_ORDER, USER_ROLES } = require("../constants");
const { AssignmentModel, SubmissionModel } = require("../models");
const { AppError } = require("../utils/appError");

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

async function listAssignmentsService({
  user,
  status,
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortOrder = SORT_ORDER.DESCENDING,
  search,
}) {
  const query = {};

  if (user.role === USER_ROLES.TEACHER) {
    query.created_by = user._id;

    if (status) {
      query.status = status;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
  }

  if (user.role === USER_ROLES.STUDENT) {
    query.status = ASSIGNMENT_STATUS.PUBLISHED;
  }

  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === SORT_ORDER.ASCENDING ? 1 : -1 };

  const [assignments, total] = await Promise.all([
    AssignmentModel.find(query).sort(sort).skip(skip).limit(Number(limit)),
    AssignmentModel.countDocuments(query),
  ]);

  return {
    assignments,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    },
  };
}

async function updateAssignmentService({ assignmentId, data, user }) {
  const assignment = await AssignmentModel.findOneAndUpdate(
    {
      _id: assignmentId,
      created_by: user?._id,
      status: ASSIGNMENT_STATUS.DRAFT,
    },
    { $set: data },
    { new: true }
  );

  if (!assignment) throw new AppError("Assignment not found!", 404);

  return assignment;
}

async function deleteAssignmentService({ assignmentId, user }) {
  const assignment = await AssignmentModel.findOneAndDelete({
    _id: assignmentId,
    created_by: user?._id,
    status: ASSIGNMENT_STATUS.DRAFT,
  });
  if (!assignment) {
    throw new AppError("Assignment not found", 404);
  }
  return true;
}

async function getAssignmentWithSubmissionsService({ assignmentId, user }) {
  const assignment = await AssignmentModel.findOne({
    _id: assignmentId,
    created_by: user?._id,
  });
  if (!assignment) {
    throw new AppError("Assignment not found", 404);
  }

  const submissions = await SubmissionModel.find({
    assignment: assignmentId,
  })
    .populate("student", "name email")
    .sort({ created_at: -1 });

  return {
    assignment,
    submissions,
  };
}

module.exports = {
  createAssignmentService,
  publishAssignmentService,
  listAssignmentsService,
  updateAssignmentService,
  deleteAssignmentService,
  getAssignmentWithSubmissionsService,
};
