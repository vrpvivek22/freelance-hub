const Joi = require("joi");

const addProfileSchema = Joi.object({
  profileImage: Joi.string().uri().allow(null, ""),
  name: Joi.string().trim().required().messages({
    "string.empty": "Please enter your name",
    "any.required": "Name is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "Please enter the title",
    "any.required": "title is required",
  }),
  skills: Joi.array().items(Joi.string()).min(1).required().messages({
    "string.empty": "Please select any skill",
    "any.required": "skill is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Please fill the Description",
    "any.required": "Description is required",
  }),
  hourlyRate: Joi.number().min(2).required().messages({
    "number.empty": "Please enter your hourlyrate",
    "number.base": "Hourly rate must be a number",
    "number.min": "Hourly rate must be at least 2 dollars",
    "any.required": "hourlyrate is required",
  }),
  country: Joi.string().required().messages({
    "string.empty": "Please enter country name",
    "any.required": "country is required",
  }),
})
  .required()
  .messages({
    "any.required": "request body is required",
  });

const updateProfileSchema = Joi.object({
  profileImage: Joi.string().uri().allow(null, ""),
  name: Joi.string().trim().messages({
    "string.empty": "Please enter your name",
    "any.required": "Name is required",
  }),
  title: Joi.string().messages({
    "string.empty": "Please enter the title",
    "any.required": "title is required",
  }),
  skills: Joi.array().items(Joi.string()).min(1).required().messages({
    "string.empty": "Please enter any skill",
    "any.required": "skill is required",
  }),
  description: Joi.string().messages({
    "string.empty": "Please fill the Description",
    "any.required": "Description is required",
  }),
  hourlyRate: Joi.number().min(2).messages({
    "number.empty": "Please enter your hourlyrate",
    "number.base": "Hourly rate must be a number",
    "number.min": "Hourly rate must be at least 2 dollars",
    "any.required": "hourly rate is required",
  }),
  country: Joi.string().messages({
    "string.empty": "Please enter country name",
    "any.required": "country is required",
  }),
})
  .min(1)
  .required()
  .messages({
    "object.min": "provide atleast 1 key",
    "any.required": "request body is required",
  });

module.exports = { updateProfileSchema, addProfileSchema };
