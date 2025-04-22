import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: JwtPayload | string;
}

const SECRET_KEY = process.env.JWT_SECRET || "derek";

export const authVerify = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  console.log(token);
  const hearderToken = req.headers.authorization;
  console.log(hearderToken);
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  verify(
    token,
    SECRET_KEY,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = decoded;
      next();
    }
  );
};
