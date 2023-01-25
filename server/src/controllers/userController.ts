import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express-serve-static-core";

class UserController {

    async register(req: Request, res: Response) {
        // TODO: make it not ass and add validations
        const {email, password} = req.body; 
        //encrypt password !!!!!
        await prisma.users.create({
            data: { 
                email: email,
                password: password,
            }
        })
        //add jwt 
        res.send("Ok")
    }

    
    async login(req: Request, res: Response) {
        // TODO: make it not ass and add validations
        const {email, password} = req.body; 
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        //jwt and password validation
        console.log(user)
        res.send("Ok")
    }

    
    async auth(req: Request, res: Response) {
        //check if user is authorized
    }
}

module.exports = new UserController()