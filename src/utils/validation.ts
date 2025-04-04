import { Request, Response, NextFunction } from "express";
import z from "zod";

export const validate =
  (validationSchema: z.Schema, target: "params" | "body" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationSchema.parse(req[target]);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          errors: error.errors.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        });
      } else {
        next(error);
      }
    }
  };
