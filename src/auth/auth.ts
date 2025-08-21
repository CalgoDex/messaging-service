import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const bearerToken = token.split(' ')[1];
    const isAuthenticated = bearerToken === process.env.API_KEY;
    if(!isAuthenticated) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}

export default auth;