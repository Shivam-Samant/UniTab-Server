import { IUser } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Attach the user object to the request
    }
  }
}
