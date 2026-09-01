import { Router } from "express";
import { AuthMiddleware , type Auth , hasRole } from "../helper.tsx/auth";
import { prisma } from "db/client";
import { OrgBody } from "../helper.tsx/db";

export const orgRouter = Router();

orgRouter.post("/",AuthMiddleware , async (req : Auth , res)=>{
    const userId = req.id;
    if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
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
        name : name,
        members : {
            create : {
                userId : userId,
                role  : "admin"
            }
        }
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
    if(!(typeof orgId === "string")){
        return(res.status(400).json({
            message : "BAD_URL"
        }))
    }
    if(await hasRole(userId , orgId) === "user"){
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


orgRouter.get("/",AuthMiddleware, async ( req : Auth ,res)=>{
       const userId = req.id;
       if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
       }
       const orgs = await prisma.members.findMany({
        where : {
           userId : userId 
        }
       })
       res.json({
        org : orgs
       })
})

