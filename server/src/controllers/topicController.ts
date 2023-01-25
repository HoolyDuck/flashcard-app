import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express-serve-static-core";

class TopicController {
  async get(req: Request, res: Response) {
    const { id } = req.params;
    const topic = await prisma.topics.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        cards: true,
      },
    });
    res.json(topic);
  }

  async getAll(req: Request, res: Response) {
    const topics = await prisma.topics.findMany({
      include: {
        cards: true,
      },
    });
    res.json(topics);
  }

  async create(req: Request, res: Response) {
    const { name, description, userId } = req.body;
    const topic = await prisma.topics.create({
      data: {
        name,
        description,
        userId
      },
    });
    res.json(topic);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;
    const topic = await prisma.topics.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
      },
    });
    res.json(topic);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const topic = await prisma.topics.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(topic);
  }
}

module.exports = new TopicController();
