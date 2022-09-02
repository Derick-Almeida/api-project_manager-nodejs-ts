import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authUser = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  if (token.includes("Bearer")) {
    token = token.split(" ")[1];
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid token",
      });
    }

    req.user = {
      id: decoded.sub,
    };

    next();
  });
};

export default authUser;
