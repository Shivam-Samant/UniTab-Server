import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  id: string; // Custom ID field
  app_name: string;
  label_name?: string; // Optional label_name field
}

const ApplicationSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true }, // Custom ID field
  app_name: { type: String, required: true },
  label_name: { type: String }, // Optional label for display
});

export const Application = mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);
