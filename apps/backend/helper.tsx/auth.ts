import { prisma } from "db/client";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
interface payload {
    id : string
}
export interface Auth extends Request {
    id ?:string
}
if(!JWT_SECRET){
    throw new Error("JWT_SECRET_NOT_SET_UP")
}
export function AuthMiddleware(req : Auth , res : Response , next : NextFunction){
    const authHandler = req.headers.authorization;
    if(!authHandler){
        return(res.status(403).json({
            message : "TOKEN_MISSING"
        }))
    }
    if(!authHandler.startsWith('Bearer')){
        return(res.status(403).json({
            message : "BAD_TOKEN"
        }))
    }
    const token = authHandler.split(" ")[1];
    if(!token){
        return(res.status(403).json({
            message : "TOKEN_MISSING"
        }))
    }
    const payload = jwt.verify(token ,( JWT_SECRET!)) as payload;
    const userId = payload.id;
    req.id = userId;
    next()
}


export async function hasRole(userId : string , orgId : string){
       const user = await prisma.members.findUnique({
           where : {
            id : userId,
            orgId : orgId
           }
       })

       return user?.role
}