import { User } from "../models/user.model";
import { verifyGoogleToken, refreshGoogleToken } from "../utils/googleAuth.util";
import { generateJWT } from "../utils/jwt.util"

class AuthService {
  /**
   * Handles Google login and user creation if necessary
   */
  async handleGoogleLogin(token: string) {
    const userData = await verifyGoogleToken(token);

    if (!userData) {
      throw { status: 401, message: "Invalid Google token" };
    }

    const { email = "", name = "", email_verified } = userData;

    if (!email_verified) {
      throw { status: 400, message: "Email not verified" };
    }

    // Find or create the user in the database
    const user = await this.findOrCreateUser(email, name, token);

    // Generate JWT
    const jwt = generateJWT({ userId: user.id });

    return { token: jwt, user };
  }

  /**
   * Finds or creates a user
   */
  async findOrCreateUser(email: string, name: string, token: string) {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, name, authToken: token });
    } else if (user.authToken !== token) {
      user.authToken = token
      await user.save()
    }

    return user;
  }

  /**
   * Verifies a Google token
   */
  async verifyGoogleToken(token: string) {
    return verifyGoogleToken(token);
  }

  /**
   * Refreshes a Google token
   */
  async refreshGoogleToken(refreshToken: string) {
    return refreshGoogleToken(refreshToken);
  }
}

export const authService = new AuthService();
