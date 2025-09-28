import Joi from "joi";

export const createProposalSchema = Joi.object({
  customer_id: Joi.string().required().messages({
    "string.empty": "Customer ID is required",
  }),

  hub_id: Joi.string().required().messages({
    "string.empty": "Hub ID is required",
  }),

  status: Joi.string()
    .valid("Pending", "Approved", "Rejected", "Active", "Inactive")
    .required()
    .messages({
      "any.required": "Status is required",
      "any.only": "Status must be one of Pending, Approved, Rejected, Active, Inactive",
    }),
  notice_period: Joi.string().min(0).max(365).required().messages({
    "any.required": "Notice period is required",
  }),

  move_in_date: Joi.string().min(0).required(),
  lock_in: Joi.string().min(0).required(),
  standard_price: Joi.string().min(0).required(),
  offered_price: Joi.string().min(0).required(),
  parking_2_wheeler: Joi.string().min(0).required(),
  offered_conference: Joi.string().min(0).required(),
  charges_for_additional: Joi.string().min(0).required(),
  advance_rent: Joi.string().min(0).required(),
  standard_price_open_dedicated_desk: Joi.string().min(0).required(),
  offered_printing_credits: Joi.string().min(0).required(),
  parking_4_wheeler: Joi.string().min(0).required(),
  charges_for_additional_conference: Joi.string().min(0).required(),
  standard_operating_timing: Joi.string()
    .required()
});
