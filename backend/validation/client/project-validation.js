const Joi = require("joi");

const addProjectSchema = Joi.object({
  projectTitle: Joi.string().required().messages({
    "string.empty": "Please enter Project Title",
    "any.required": "Project Title is required",
  }),
  projectDetails: Joi.string().required().messages({
    "string.empty": "Please enter Project Details",
    "any.required": "Project Details are required",
  }),
  skills: Joi.array().items(Joi.string()).min(1).required().messages({
    "string.empty": "Please select any skill",
    "any.required": "Skills are required",
  }),
  budget: Joi.number().min(10).messages({
    "number.base": "budget must be a number",
    "number.min": "Budget must be at least $10",
    "number.empty": "please enter the budget",
  }),
  deadline: Joi.date().greater("now").required().messages({
    "date.greater": "Deadline must be a future date",
    "date.empty": "Please enter the date",
    "any.required": "deadline is required",
  }),
})
  .required()
  .messages({
    "any.required": "request body is required",
  });

const updateProjectSchema = Joi.object({
  projectTitle: Joi.string().messages({
    "string.empty": "Please enter Project Title",
  }),
  projectDetails: Joi.string().messages({
    "string.empty": "Please enter Project Details",
  }),
  skills: Joi.array().items(Joi.string()).min(1).required().messages({
    "string.empty": "Please select any skill",
  }),
  budget: Joi.number().min(10).messages({
    "number.base": "budget must be a number",
    "number.min": "Budget must be at least $10",
    "number.empty": "please enter the budget",
  }),
  status: Joi.string().valid("completed", "inprogress", "progress"),
  deadline: Joi.date().greater("now").messages({
    "date.greater": "Deadline must be a future date",
    "date.base": "Please enter the date",
  }),
})
  .required()
  .min(1)
  .messages({
    "object.min": "Provide atleast 1 key",
    "any.required": "request body is required",
  });

module.exports = { addProjectSchema, updateProjectSchema };
