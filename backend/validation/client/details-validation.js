const Joi = require("joi");

const addDetailsSchema = Joi.object({
  profileImage: Joi.string().uri().allow(null, ""),
  name: Joi.string().trim().required().messages({
    "string.empty": "Please enter your name",
    "any.required": "Name is required",
  }),
  description: Joi.string(),
  clientType: Joi.string().required().messages({
    "string.empty": "Please select any type",
    "any.required": "type is required",
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

const updateDetailsSchema = Joi.object({
  profileImage: Joi.string().uri().allow(null, ""),
  name: Joi.string().trim().messages({
    "string.empty": "Please enter your name",
  }),
  description: Joi.string(),
  clientType: Joi.string().messages({
    "string.empty": "Please select client type",
  }),
  country: Joi.string().messages({
    "string.empty": "Please enter country name",
    "string.base": "please enter valid country name",
  }),
})
  .min(1)
  .required()
  .messages({
    "object.min": "you must provide atleast 1 key",
    "any.required": "request body is required",
  });

module.exports = { addDetailsSchema, updateDetailsSchema };
