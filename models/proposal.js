import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hub: [{ type: String }], 
  status: { type: String, required: true }, 
  move_in_date: { type: Date },
  notice_period: { type: Number }, 
  standard_price: { type: Number },
  offered_price: { type: Number },
  parking_2_wheeler: { type: Number },
  offered_conference: { type: Number },
  charges_for_additional: { type: Number },
  advance_rent: { type: Number },
  standard_price_open_dedicated_desk: { type: Number },
  offered_printing_credits: { type: Number },
  parking_4_wheeler: { type: Number },
  charges_for_additional_conference: { type: Number },
  standard_operating_timing: { type: String } 
}, { timestamps: true });

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;
