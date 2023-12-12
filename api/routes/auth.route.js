import express from "express";
import {
  signUp,
  SignIn,
  google,
  signOut,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", SignIn);
router.post("/google", google);
router.get("/sign-out", signOut);
export default router;
