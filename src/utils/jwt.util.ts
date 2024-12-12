import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use environment variables for production
const JWT_EXPIRATION = "1d"; // Token expiration time

// Function to generate a JWT
export const generateJWT = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRATION,
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

// Function to verify a JWT
export const verifyJWT = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
