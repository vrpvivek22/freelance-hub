import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Please enter your email",
    "string.email": "Invalid Email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Please enter your password",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

export const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Please provide your name",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});
