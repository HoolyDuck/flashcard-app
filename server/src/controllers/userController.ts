import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response, NextFunction } from "express-serve-static-core";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ApiError } from "../error/ApiError";

interface IUser {
  id: number;
  email: string;
  password: string;
}

function generateJWT(user: IUser) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "24h",
    }
  );
}

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    // TODO: make it not ass and add validations
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Invalid email or password"));
    }

    if (password.length < 8) {
      return next(
        ApiError.badRequest("Password must be at least 8 characters long")
      );
    }
    const userExists = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return next(ApiError.badRequest("User already exists"));
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await prisma.users.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });

    const token = generateJWT(user);
    res.json({ token });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    // TODO: make it not ass
    const { email, password } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Invalid email or password"));
    }

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Invalid email or password"));
    }

    const token = generateJWT(user);
    res.json({ token });
  }

  async auth(req: Request, res: Response) {
    //@ts-ignore
    const token = generateJWT(req.user);
    return res.json({ token });
  }
}

module.exports = new UserController();
