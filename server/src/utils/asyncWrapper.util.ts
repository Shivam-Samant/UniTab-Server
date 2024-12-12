import { Request, Response, NextFunction } from "express";

/**
 * Wraps an async middleware or route handler for proper error handling in Express.
 * @param fn - The async function to wrap
 * @returns A function wrapped with error handling
 */
export const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
