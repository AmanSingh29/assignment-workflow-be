const { celebrate, Joi, Segments } = require("celebrate");

const submitAssignmentValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    assignmentId: Joi.string().hex().length(24).required(),
  }),
  [Segments.BODY]: Joi.object({
    answer: Joi.string().min(5).required(),
  }),
});

module.exports = {
  submitAssignmentValidator,
};
