import { NextFunction } from "express";
import { CustomReq, Email, Passw, Token } from "../types";

import { sign, verify } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { NotAuthError } from "./errors";
import config from "config";

const KEY = config.get("jwtKey") as string;

if (!KEY) {
  console.log("Secret jwt key not found! Check default.json file.");
  process.exit(1);
}

function createJSONToken(email: Email) {
  return sign({ email }, KEY, { expiresIn: "1h" });
}

function validateJSONToken(token: Token) {
  return verify(token, KEY);
}

function isValidPassword(password: Passw, storedPassword: Passw) {
  return compare(password, storedPassword);
}

function checkAuthMiddleware(
  req: CustomReq,
  res: Response,
  next: NextFunction
) {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NotAuthError("Not authenticated"));
  }

  const authFragments = req.headers.authorization.split(" ");
  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER INVALID");
    return next(new NotAuthError("Not authenticatd."));
  }

  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }
  next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuthMiddleware = checkAuthMiddleware;
