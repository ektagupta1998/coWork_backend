import express from "express";
import hubController from "../controller/hubController.js";

const router = express.Router();

router.get("/", hubController.getAllHubs);
router.get("/:id", hubController.getHubById);
router.post("/", hubController.createHub);
router.put("/:id", hubController.updateHub);
router.delete("/:id", hubController.deleteHub);

export default router;
