import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { verifyGoogleToken } from "../utils/googleAuth.util";
import { generateJWT } from "../utils/jwt.util";
import { auditLogService } from "../services/auditLog.service"

class AuthController {
  /**
   * Handles Google login
   * @param req - Express request object
   * @param res - Express response object
   */
  async googleLogin(req: Request, res: Response): Promise<void> {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ error: "Google token is required" });
      return;
    }

    try {
      // Verify the Google token
      const userData = await verifyGoogleToken(token);

      if (!userData) {
        res.status(401).json({ error: "Invalid Google token" });
        return;
      }

      const { email = '', name = '', email_verified } = userData;

      if (!email_verified) {
        res.status(400).json({ error: "Email not verified" });
        return;
      }

      // Check if the user exists or create a new one
      const user = await authService.findOrCreateUser(email, name, token);

      // Generate a JWT for the user
      const jwt = generateJWT({ userId: user.id });

      try {
          // Store the IP address from the request object
        const ipAddress = req.ip;

        // Log the login activity
        await auditLogService.logActivity(email, "login", {}, ipAddress);
      } catch (error: any) {
        console.log("An error occurred while save the audit logs for email address:", email, error);
      }

      res.status(200).json({ message: "Login successful", data: { token: jwt, userId: user._id } });
    } catch (error) {
      console.error("Error during Google login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Verifies the provided Google token
   */
  async verifyGoogleToken(req: Request, res: Response): Promise<void> {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ error: "Google token is required" });
      return;
    }

    try {
      const userData = await authService.verifyGoogleToken(token);
      res.status(200).json({ message: "Token verified", data: userData });
    } catch (error: any) {
      console.error("Error verifying Google token:", error);
      res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
  }

  /**
   * Refreshes the Google token
   */
  async refreshGoogleToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }

    try {
      const tokenData = await authService.refreshGoogleToken(refreshToken);
      res.status(200).json({ message: "Token refreshed successfully", data: tokenData });
    } catch (error: any) {
      console.error("Error refreshing Google token:", error);
      res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
  }
}

export const authController = new AuthController();
