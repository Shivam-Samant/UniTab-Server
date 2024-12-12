import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  userId: string;
  action: string; // e.g., "login", "application_selected", "tab_conflict"
  details: object; // Flexible object to store appId, tabId, or other metadata
  ipAddress?: string; // IP address of the user
  timestamp: Date;
}

const AuditLogSchema: Schema = new Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: Object, default: {} },
  ipAddress: { type: String },
}, {
  timestamps: true,
});

export const AuditLog = mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
