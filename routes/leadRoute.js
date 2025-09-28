import express from "express";
import leadController from "../controller/leadController.js";
import { validate } from "../middlewares/validate.js";
import { createLeadSchema } from "../validators/leadValidator.js";

const router = express.Router();

router.post("/create", validate(createLeadSchema), leadController.createLead);
router.get("/", leadController.getAllLeads);
router.get("/:id", leadController.getLeadById);
router.put("/:id", leadController.updateLead);
router.delete("/:id", leadController.deleteLead);

export default router;
