import { OAuth2Client } from "google-auth-library";
import axios from "axios"

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "your-google-client-id";
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret";

const client = new OAuth2Client(CLIENT_ID);

/**
 * Verifies the ID token sent by the frontend after Google login.
 * @param token - The ID token received from the frontend.
 * @returns Decoded token payload containing user information.
 */
export const verifyGoogleToken = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID for verification
    });
    const payload = ticket.getPayload();
    return payload; // Payload contains user info like email, name, etc.
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw new Error("Invalid Google token");
  }
};

export const refreshGoogleToken = async (refreshToken: string) => {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      },
    });

    const { access_token, expires_in } = response.data;

    return {
      accessToken: access_token,
      expiresIn: expires_in,
    };
  } catch (error: any) {
    console.error("Error refreshing Google token:", error.response?.data || error.message);
    throw new Error("Failed to refresh Google token");
  }
};
