import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

export function auth(req: Request, res: Response, next: NextFunction) {

    const token = req.header('Authorization').split(' ')[1];
    if(!token) return res.status(401).send('Access denied. No token provided.');
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        //@ts-ignore
        req.user = decoded;
        next();
    } catch(ex) {
        res.status(400).send('Invalid token.');
    }
}

