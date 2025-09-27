import Joi from "joi";

export const createProposalSchema = Joi.object({
  customerId: Joi.string().required().messages({
    "string.empty": "Customer ID is required",
  }),

  hub: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": "At least one hub is required",
    "any.required": "Hub is required"
  }),

  status: Joi.string()
    .valid("Pending", "Approved", "Rejected", "Active", "Inactive")
    .required()
    .messages({
      "any.required": "Status is required",
      "any.only": "Status must be one of Pending, Approved, Rejected, Active, Inactive",
    }),

  move_in_date: Joi.date().greater("now").required().messages({
    "date.greater": "Move-in date must be in the future",
    "any.required": "Move-in date is required",
  }),

  notice_period: Joi.number().min(0).max(365).required().messages({
    "any.required": "Notice period is required",
  }),

  standard_price: Joi.number().min(0).required(),
  offered_price: Joi.number().min(0).required(),
  parking_2_wheeler: Joi.number().min(0).required(),
  offered_conference: Joi.number().min(0).required(),
  charges_for_additional: Joi.number().min(0).required(),
  advance_rent: Joi.number().min(0).required(),
  standard_price_open_dedicated_desk: Joi.number().min(0).required(),
  offered_printing_credits: Joi.number().min(0).required(),
  parking_4_wheeler: Joi.number().min(0).required(),
  charges_for_additional_conference: Joi.number().min(0).required(),

  standard_operating_timing: Joi.string()
    .pattern(/^\d{2}:\d{2}-\d{2}:\d{2}$/, "HH:MM-HH:MM")
    .required()
    .messages({
      "any.required": "Standard operating timing is required",
      "string.pattern.name": "Timing must be in HH:MM-HH:MM format",
    }),
});
