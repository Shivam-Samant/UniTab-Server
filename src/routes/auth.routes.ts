import express from "express";
import { authController } from "../controllers/auth.controller";

const router = express.Router();

/**
 * POST /api/auth/google
 * Handles Google login by verifying the token from the frontend.
 */
router.post("/google", authController.googleLogin);

/**
 * POST /api/auth/verify
 * Verifies the provided Google token.
 */
router.post("/verify", authController.verifyGoogleToken);

/**
 * POST /api/auth/refresh
 * Refreshes the Google access token using the refresh token.
 */
router.post("/refresh", authController.refreshGoogleToken);

export default router;
