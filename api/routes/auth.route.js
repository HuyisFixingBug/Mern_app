import express from "express";
import { signUp, SignIn, google } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", SignIn);
router.post("/google", google);
export default router;
