import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response, NextFunction } from "express-serve-static-core";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser {
    id: number,
    email: string,
    password: string
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
  async register(req: Request, res: Response) {
    // TODO: make it not ass and add validations
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await prisma.users.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });

    const token = generateJWT(user);
    res.json({token});
  }

  async login(req: Request, res: Response, next: NextFunction) {
    // TODO: make it not ass
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    let comparePassword = bcrypt.compareSync(password, user.password)
    if(!comparePassword) {
        //do something normal here
        return next(res.send("Durak?"))
    }

    const token = generateJWT(user);
    res.json({token});

  }

  async auth(req: Request, res: Response) {
    //@ts-ignore
    const token = generateJWT(req.user)
    return res.json({token})
  }
}

module.exports = new UserController();
