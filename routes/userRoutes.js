import express from "express";
import userController from "../controller/userController.js";
import { createUserSchema, loginSchema } from "../validators/userValidators.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", validate(createUserSchema), userController.createUser);
router.post("/login", validate(loginSchema), userController.login);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
