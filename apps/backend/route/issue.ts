import { Router } from "express";
import { AuthMiddleware , type Auth , hasRole } from "../helper.tsx/auth";
import { prisma } from "db/client";
import { issueBody, moveIssue } from "../helper.tsx/db";
export const issueRouter = Router();


issueRouter.post("/issue/:boardId" ,AuthMiddleware, async (req : Auth ,res)=>{
    console.log("issue logged")
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
issueRouter.get("/:orgId/:boardId",AuthMiddleware ,async (req : Auth , res) =>{
    console.log("here")
    const orgId = req.params.orgId;
    const boardId = req.params.boardId;
    if(!(typeof boardId ==="string")){
        return res.status(400).json({
            message : "Bad_request"
        })
    }
    if(!(typeof orgId === "string")){
        return(res.status(400).json({
            message :"BAD_REQUEST"
        }))
    }
    const issues = await prisma.issue.findMany({
        where : {
            boardId : boardId
        }
    })
    res.json({
        issues : issues
    })
})

issueRouter.patch("/:issueId/:orgId", AuthMiddleware , async(req  : Auth,res)=>{
    const issueId = req.params.id;
    if(!(typeof issueId === "string")){
        return(res.status(400).json({
            message : "BAD_REQUEST"
        }))
    }
    const orgId = req.params.orgId;
    if(!(typeof orgId === "string")){
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
    if(await hasRole(userId, orgId) === "user"){
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

issueRouter.move("/move/:issueId" ,AuthMiddleware,async (req : Auth,res)=>{
      const userId = req.id;
      if(!userId){
        return(res.status(400).json({
            message :"BAD_REQUEST"
        }))
      }
      const issueId = req.params.id;
      if(!(typeof issueId === "string")){
        return(res.status(400).json({
            message : "BAD_REQUEST"
        }))
      }
      const parsedBody = moveIssue.safeParse(req.body);
      if(!parsedBody.success){
        return(res.status(400).json({
            message : "BAD_REQUEST"
        }))
      }
      const {title} = parsedBody.data;
      const move = await prisma.issue.update({
         where : {
            id : issueId
         } , data : {
             title : title
         }
      })

      res.json({
        message : "Issue updated"
      })
})