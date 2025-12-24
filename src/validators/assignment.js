const { celebrate, Joi, Segments } = require("celebrate");

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

module.exports = {
  createAssignmentValidator,
  publishAssignmentValidator,
};
