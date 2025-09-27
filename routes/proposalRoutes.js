import express from "express";
import proposalController from "../controller/proposalController.js";
import { validate } from "../middlewares/validate.js";
import { createProposalSchema } from "../validators/proposalValidators.js";
const router = express.Router();

router.post("/", validate(createProposalSchema), proposalController.createProposal);
router.get("/", proposalController.getAllProposals);
router.get("/:id", proposalController.getProposalById);
router.put("/:id", proposalController.updateProposal);
router.delete("/:id", proposalController.deleteProposal);

export default router;
