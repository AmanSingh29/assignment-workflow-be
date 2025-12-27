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
  submittedOnly = false,
}) {
  const skip = (page - 1) * limit;
  const sortDirection = sortOrder === SORT_ORDER.ASCENDING ? 1 : -1;

  const matchStage = {};

  if (user.role === USER_ROLES.TEACHER) {
    matchStage.created_by = user._id;

    if (status) {
      matchStage.status = status;
    }
  }

  if (user.role === USER_ROLES.STUDENT && !submittedOnly) {
    matchStage.status = ASSIGNMENT_STATUS.PUBLISHED;
  }

  const pipeline = [
    { $match: matchStage },

    {
      $lookup: {
        from: "submissions",
        localField: "_id",
        foreignField: "assignment",
        as: "submissions",
      },
    },

    {
      $addFields: {
        submissionCount:
          user.role === USER_ROLES.TEACHER
            ? { $size: "$submissions" }
            : "$$REMOVE",

        hasSubmitted:
          user.role === USER_ROLES.STUDENT
            ? {
                $in: [
                  user._id,
                  {
                    $map: {
                      input: "$submissions",
                      as: "s",
                      in: "$$s.student",
                    },
                  },
                ],
              }
            : "$$REMOVE",
      },
    },
  ];

  if (user.role === USER_ROLES.STUDENT && submittedOnly) {
    pipeline.push({
      $match: {
        hasSubmitted: true,
      },
    });
  }

  pipeline.push(
    { $sort: { [sortBy]: sortDirection } },
    {
      $facet: {
        data: [
          { $skip: skip },
          { $limit: Number(limit) },
          {
            $project: {
              submissions: 0,
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    }
  );

  const result = await AssignmentModel.aggregate(pipeline);

  const assignments = result[0].data;
  const totalRecords = result[0].totalCount[0]?.count || 0;

  return {
    assignments,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
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
  });
  if (!assignment) {
    throw new AppError("Assignment not found", 404);
  }

  const filter = {
    assignment: assignmentId,
  };
  if (
    user.role == !USER_ROLES.TEACHER ||
    user?._id?.toString() !== assignment?.created_by?.toString()
  ) {
    filter.student = user._id;
  }
  const submissions = await SubmissionModel.find(filter)
    .populate("student", "name email")
    .sort({ created_at: -1 });

  return {
    assignment,
    submissions,
  };
}

async function markAssignmentCompletedService({ assignmentId, user }) {
  const assignment = await AssignmentModel.findOneAndUpdate(
    {
      _id: assignmentId,
      created_by: user?._id,
      status: ASSIGNMENT_STATUS.PUBLISHED,
    },
    { $set: { status: ASSIGNMENT_STATUS.COMPLETED } },
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
  listAssignmentsService,
  updateAssignmentService,
  deleteAssignmentService,
  getAssignmentWithSubmissionsService,
  markAssignmentCompletedService,
};
