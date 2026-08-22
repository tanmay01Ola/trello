import { Router } from "express";
import { AuthMiddleware, hasRole, type Auth } from "../helper.ts/auth";
import { prisma } from "db/client";
import { issueBody } from "../helper.ts/db";
import { is } from "zod/locales";
const issueRouter = Router();


issueRouter.post("/issue/:boardId" ,AuthMiddleware, async (req : Auth ,res)=>{
    const userId =req.id;
    if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
    }
  const boardId = req.params.boardId;
  if(!(typeof boardId === "string")){
    return(res.status(400).json({
        message : "BAD_REQUEST"
    }))
  }
  const parsedBody = issueBody.safeParse(req.body);
  if(!parsedBody.success){
    return(res.status(400).json({
        message : "INTERNAL_SERVER_ERROR"
    }))
  }
  const {title , status , description} = parsedBody.data;
  const issue = await prisma.issue.create({
    data : {
        title : title,
        status : status,
        description : description,
        boardId : boardId 
    }
  })

  res.json({
    message : "ISSUE_CREATED",
    id : issue.id
  })
})

issueRouter.patch("/:issueId", AuthMiddleware , async(req  : Auth,res)=>{
    const issueId = req.params.id;
    if(!(typeof issueId === "string")){
        return(res.status(400).json({
            message : "BAD_REQUEST"
        }))
    }
    const userId = req.id;
    if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
    }
    if(await hasRole(userId) === "user"){
        return (res.status(403).json({
            message : "UNAUTHORIZED"
        }))
    }
    await prisma.issue.delete({
        where : {
            id: issueId
        }
    })
    res.json({
        message : "ISSUE_DELETED"
    })
})