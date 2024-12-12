import { Request, Response } from "express";
import { applicationService } from "../services/application.service";
import { auditLogService } from "../services/auditLog.service"

export const applicationController = {
  /**
   * Handles the GET request to fetch all applications.
   */
  async getApplications(req: Request, res: Response): Promise<void> {
    try {
      const applications = await applicationService.getApplications();
      res.status(200).json(applications);
    } catch (error) {
      console.error("Error in getApplications:", error);
      res.status(500).json({ message: "Failed to fetch applications." });
    }
  },

  /**
   * POST /api/applications/select
   * Logs the details of the application selected by the user.
   */
  async handleApplicationSelect(req: Request, res: Response): Promise<void> {
    const { userId, appId } = req.body;

    if (!userId || !appId) {
      res.status(400).json({ error: "User ID and App ID are required." })
      return
    }

    try {
      // Log the application selection activity
      const ipAddress = req.ip; // Retrieve user's IP address
      await auditLogService.logActivity(userId, "application_selected", { appId }, ipAddress);

      res.status(200).json({ message: "Application selection logged successfully." });
    } catch (error) {
      console.error("Error logging application selection:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
}
