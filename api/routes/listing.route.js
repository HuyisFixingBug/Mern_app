import express from "express";
import {
  createListing,
  getUserListingPages,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", createListing);
router.get("/listings/:id", verifyToken, getUserListingPages);

export default router;
