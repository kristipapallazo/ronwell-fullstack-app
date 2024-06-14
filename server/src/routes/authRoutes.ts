import express, { Request, Response, NextFunction } from "express";
import { add, get } from "../data/user";
import { createJSONToken, isValidPassword } from "../util/auth";
import { isValidEmail, isValidText } from "../util/validation";
import { ErrorsData } from "../types";

const authRoouter = express.Router();

authRoouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const errors: ErrorsData = {};

    if (!data?.email || !data?.password) {
      if (!data?.email) errors.email = "Email missing.";
      if (!data?.password) errors.password = "Password missing.";

      return res.status(422).json({ message: "User data missing", errors });
    }

    const { email, password } = data;

    if (!isValidEmail(email)) {
      errors.email = "Invalid email.";
    } else {
      try {
        const existingUser = await get(email);
        if (existingUser) {
          errors.email = "Email already exists.";
        }
      } catch (error) {}
    }

    if (!isValidText(password, 6)) {
      errors.password = "Invalid password. Must be at least 6 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "User signup failed due to validation errors.",
        errors,
      });
    }

    try {
      const createdUser = await add(data);
      const authToken = createJSONToken(createdUser.email);
      res.status(201).json({
        message: "User created.",
        user: createdUser,
        token: authToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRoouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const errors: ErrorsData = {};
    if (!data?.email || !data?.password) {
      if (!data?.email) errors.email = "Email missing.";
      if (!data?.password) errors.password = "Password missing.";

      return res.status(422).json({ message: "User data missing", errors });
    }

    const { email, password } = data;

    let user;
    try {
      user = await get(email);
    } catch (error) {
      const e = error as Error;
      return res
        .status(401)
        .json({ message: e.message || "Authentication failed." });
    }

    const pwIsValid = await isValidPassword(password, user.password);
    if (!pwIsValid) {
      return res.status(422).json({
        message: "Invalid credentials",
      });
    }

    const token = createJSONToken(email);
    res.json({ token });
  }
);

module.exports = authRoouter;
