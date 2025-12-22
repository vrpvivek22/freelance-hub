const Joi = require("joi");

const bidSchema = Joi.object({
  bidAmount: Joi.number().required().messages({
    "number.empty": "Please enter the amount",
    "number.base": "Amount must be a number",
    "any.required": "Bid amount is required",
  }),
  coverLetter: Joi.string().required().messages({
    "string.empty": "message required",
    "string.base": "message must be a string",
    "any.required": "Cover Letter is required",
  }),
  projectDelivery: Joi.date().greater("now").required().messages({
    "date.greater": "It must be in future date",
    "date.empty": "Please enter the date",
    "any.required": "delivery date is required",
  }),
})
  .required()
  .messages({
    "any.required": "request body is required",
  });

const updateBidSchema = Joi.object({
  bidAmount: Joi.number().messages({
    "number.empty": "Please enter the amount",
    "number.base": "Amount must be a number",
  }),
  coverLetter: Joi.string().messages({
    "string.empty": "message required",
    "string.base": "message must be a string",
  }),
  status: Joi.string().valid(
    "pending",
    "inprogress",
    "completed",
    "closed",
    "incomplete"
  ),
  projectDelivery: Joi.date().greater("now").messages({
    "date.greater": "It must be in future date",
    "date.empty": "Please enter the date",
  }),
})
  .required()
  .min(1)
  .messages({
    "object.min": "please provide atlease 1 key",
    "any.required": "request body is required",
  });

module.exports = { bidSchema, updateBidSchema };
