import { Router } from "express";
import { AuthMiddleware, hasRole, type Auth } from "../helper.ts/auth";
import { prisma } from "db/client";
import { OrgBody } from "../helper.ts/db";
import { nativeEnum } from "zod/v3";
import { userRouter } from "./user";

export const orgRouter = Router();

orgRouter.post("org",AuthMiddleware , async (req : Auth , res)=>{
    const userId = req.id;
    if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
    }
   if(await hasRole(userId) === "user"){
    return(res.status(401).json({
        message : "UNAUTHORIZED"
    }))
   }
   const parsedBody = OrgBody.safeParse(req.body);
   if(!parsedBody.success){
    return(res.status(400).json({
        message : "BAD_INPUTS"
    }))
   }
   const {name} = parsedBody.data;
   const org = await prisma.org.create({
    data : {
        name : name
    }
   })

   res.json({
    message : "ORG_CREATED",
    id : org.id
   })
})

orgRouter.delete("/org/:orgId", AuthMiddleware ,async ( req : Auth , res)=>{
    const userId = req.id;
    if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
    }
    const orgId = req.params.orgId;
    if(!orgId){
        return(res.status(400).json({
            message : "BAD_URL"
        }))
    }
    if(await hasRole(userId) === "user"){
        return(res.status(403).json({
            message : "UNZUTHORIZED"
        }))
    }
    const deleteOrg = await prisma.org.delete({
        where : {
            id : userId
        }
    })

    res.json({
        message : "ORG_DELETED"
    })
})

