import { Request, Response } from "express";
import { auditLogService } from "../services/auditLog.service";

class AuditController {
  async logActivity(req: Request, res: Response) {
    const { userId, activity } = req.body;
    await auditLogService.logActivity(userId, activity);
    res.status(200).json({ message: "Activity logged" });
  }
}

export const auditController = new AuditController();
