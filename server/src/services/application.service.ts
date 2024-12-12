import { Application } from "../models/application.model";

class ApplicationService {
  /**
   * Fetches all applications from the database.
   * @returns A promise resolving to the list of applications.
   */
  async getApplications() {
    try {
      const applications = await Application.find({}, { _id: 0 }); // Exclude MongoDB's default `_id`
      return applications;
    } catch (error) {
      console.error("Error retrieving applications:", error);
      throw new Error("Failed to fetch applications.");
    }
  }
}

export const applicationService = new ApplicationService();
