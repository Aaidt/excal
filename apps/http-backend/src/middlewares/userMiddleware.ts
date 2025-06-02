import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express"

const JWT_SECRET = process.env.JWT_SECRET ?? "";

export function userMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] ?? "";
    const token = typeof authHeader === 'string' ? authHeader : ''

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    if(decoded){
        req.userId = decoded.userId;
        next(); 
    }else{
        res.json({
            error: 'Incorrect jwt secret'
        })
        return 
    }
}