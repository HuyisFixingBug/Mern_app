import express from "express";
import {
  createListing,
  deleteListing,
  editListing,
  getListing,
  getUserListingPages,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", createListing);
router.get("/listings/:id", verifyToken, getUserListingPages);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/edit/:id", verifyToken, editListing);
router.get("/get/:id", getListing);
export default router;
