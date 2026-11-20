import type { NextFunction, Request, Response } from "express";
import { firebaseAuth } from "../lib/firebaseAdmin.js";

export interface AuthedRequest extends Request {
  admin?: { uid: string; email: string | undefined };
}

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  try {
    const decoded = await firebaseAuth.verifyIdToken(token);
    req.admin = { uid: decoded.uid, email: decoded.email };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}