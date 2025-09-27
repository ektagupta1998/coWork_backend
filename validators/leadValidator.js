import Joi from "joi";

export const createLeadSchema = Joi.object({
  companyName: Joi.string().required().messages({
    "string.empty": "Company name is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  phone: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10-15 digits",
    }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),
  status: Joi.string()
    .valid("New", "Contacted", "Qualified", "Lost")
    .required()
    .messages({
      "any.only": "Status must be one of New, Contacted, Qualified, Lost",
      "string.empty": "Status is required",
    }),
});
