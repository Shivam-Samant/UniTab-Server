import { AuditLog } from "../models/auditLog.model";

class AuditLogService {
  /**
   * Logs a user activity
   * @param userId - ID of the user
   * @param action - Action performed by the user
   * @param details - Additional details for the activity (e.g., appId, tabId)
   * @param ipAddress - IP address of the request
   */
  async logActivity(userId: string, action: string, details: object = {}, ipAddress?: string): Promise<void> {
    try {
      await AuditLog.create({ userId, action, details, ipAddress });
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  }
}

export const auditLogService = new AuditLogService();
