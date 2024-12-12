import mongoose from "mongoose";
import { Application } from "../models/application.model";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const applications = [
  { id: "5eaa781456b9935e0b4fbc93", app_name: "ORBIN", label_name: "Orbin App" },
  { id: "5eaa781424060409687ba049", app_name: "ZILCH", label_name: "Zilch App" },
  { id: "5eaa7814ac87f820fa6fcce1", app_name: "ZOXY", label_name: "Zoxy Management Tool" },
  { id: "5eaa7814d19b4a7ec4ba5c49", app_name: "SUPPORTAL", label_name: "Supportal Helpdesk" },
  { id: "5eaa781483c7bc55a431f217", app_name: "GONKLE", label_name: "Gonkle Collaboration" },
  { id: "5eaa7814a9407212d5c74d8d", app_name: "ZENTILITY", label_name: "Zentility Dashboard" },
  { id: "5eaa7814af7ae3086119c7dc", app_name: "OBLIQ", label_name: "Obliq Finance Tracker" },
  { id: "5eaa7814a9f8e085c1055f86", app_name: "APPLICA", label_name: "Applica Workflow" },
  { id: "5eaa781408f38cbe5745d37f", app_name: "LUNCHPAD", label_name: "Lunchpad Scheduler" },
  { id: "5eaa78144bc1d00fa1f0598c", app_name: "SOLGAN", label_name: "Solgan Marketing Tool" },
];


const seedApplications = async () => {
  try {
    // Connect to the database
    const dbUri = process.env.MONGO_URI || "mongodb://localhost:27017/app-db";
    await mongoose.connect(dbUri);
    console.log("Connected to the database.");

    // Clear existing data
    await Application.deleteMany({});
    console.log("Cleared existing application data.");

    // Insert new data
    await Application.insertMany(applications);
    console.log("Seeded application data successfully.");

    // Disconnect
    await mongoose.disconnect();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error seeding application data:", error);
    process.exit(1); // Exit with failure
  }
};

// Run the seeder
seedApplications();
