import express from "express";
import { getUsers, register, login } from "../controllers/authController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/register", register);
router.post("/login", login);

export default router;
