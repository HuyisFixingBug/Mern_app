import express from "express";
import { signUp, SignIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", SignIn);
export default router;
