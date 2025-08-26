import express from "express";
import { toggleAdmin, getAllUsers } from "../controller/admin.controller.js";

const router = express.Router();

// Toggle admin status for a user
router.put("/user/:userId/admin", toggleAdmin);

// Get all users
router.get("/users", getAllUsers);

export default router;