import express from "express";
const router = express.Router();
import { signup, login, createAdmin, createAdminWithKey } from "../controller/user.controller.js";

// User signup route
router.post("/signup", signup);

// User login route
router.post("/login", login);

// Create admin user (special endpoint)
router.post("/create-admin", createAdmin);

// Create admin user with secret key
router.post("/create-admin-key", createAdminWithKey);

export default router;