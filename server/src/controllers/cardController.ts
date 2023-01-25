import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express-serve-static-core";

class CardController {

    async get(req: Request, res: Response) {
        const { id } = req.params;
        const card = await prisma.cards.findUnique({
            where: {
                id: Number(id),
            }
        });
        res.json(card);
    }

    async getAll(req: Request, res: Response) {
        const cards = await prisma.cards.findMany();
        res.json(cards);
    }
    
    async create(req: Request, res: Response) {
        const { question, answer, topicId } = req.body;
        const card = await prisma.cards.create({
            data: {
                question,
                answer,
                topicId
            },
        });
        res.json(card);

    }
    
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { question, answer, progress } = req.body;
        const card = await prisma.cards.update({
            where: {
                id: Number(id),
            },
            data: {
                question,
                answer,
                progress
            },
        });
        res.json(card);

    }
    
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const card = await prisma.cards.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(card); 

    }

}

module.exports = new CardController()