import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hub_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hub" },
  status: { type: String, required: true },
  move_in_date: { type: String },
  lock_in : { type: String },
  notice_period: { type: String }, 
  standard_price: { type: String },
  offered_price: { type: String },
  parking_2_wheeler: { type: String },
  offered_conference: { type: String },
  charges_for_additional: { type: String },
  advance_rent: { type: String },
  standard_price_open_dedicated_desk: { type: String },
  offered_printing_credits: { type: String },
  parking_4_wheeler: { type: String },
  charges_for_additional_conference: { type: String },
  standard_operating_timing: { type: String } 
}, { timestamps: true });

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;
