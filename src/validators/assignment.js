const { celebrate, Joi, Segments } = require("celebrate");
const { ASSIGNMENT_STATUS, SORT_ORDER } = require("../constants");

const createAssignmentValidator = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),
    description: Joi.string().trim().min(10).required(),
    due_date: Joi.date().greater("now").required(),
  }).required(),
});

const publishAssignmentValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
});

const listAssignmentsValidator = celebrate({
  [Segments.QUERY]: Joi.object({
    status: Joi.string().valid(...Object.values(ASSIGNMENT_STATUS)),
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    sortBy: Joi.string()
      .valid("created_at", "updated_at", "due_date")
      .default("created_at"),
    sortOrder: Joi.string()
      .valid(...Object.values(SORT_ORDER))
      .default(SORT_ORDER.DESCENDING),
    submittedOnly: Joi.boolean().default(false),
  }),
});

const updateAssignmentValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(200),
    description: Joi.string().min(5),
    due_date: Joi.date(),
  }).min(1),
});

const deleteAssignmentValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
});

const getAssignmentDetailsValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  createAssignmentValidator,
  publishAssignmentValidator,
  listAssignmentsValidator,
  updateAssignmentValidator,
  deleteAssignmentValidator,
  getAssignmentDetailsValidator,
};
