import { Request, Response, NextFunction } from "express";

// Extend Express Request type to include 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

import admin from "../db/firebase";
import { asyncHandler } from "../utility/asyncHandler";
import { ApiError } from "../utility/ApiError";

export const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, 'No token provided');
  }
  
  const idToken = authHeader.split(" ")[1];
  
  // In development mode, skip Firebase authentication if Firebase is not initialized
  if (!admin.apps || admin.apps.length === 0) {
    // Mock user for development
    req.user = {
      uid: 'dev-user-id',
      email: 'dev@example.com',
      roles: ['USER'],
      language: 'en',
    };
    return next();
  }
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if(!decodedToken) {
      throw new ApiError(401, 'You are not authorized to access this resource');
    }
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      roles: decodedToken.roles,
      language: decodedToken.language,
    };
    next();
  } catch (err: any) {
    console.error("Token verification error:", err);
    if (err.code === 'auth/id-token-expired') {
      throw new ApiError(401, 'Token expired. Please log in again.');
    } else if (err.code === 'auth/argument-error') {
      throw new ApiError(401, 'Invalid token format.');
    } else {
      throw new ApiError(401, 'Invalid or expired token');
    }
  }
});