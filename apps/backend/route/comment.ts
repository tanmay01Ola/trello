import { Router } from "express";
import { AuthMiddleware, type Auth } from "../helper.tsx/auth";
import { prisma } from "db/client";
import { commentBody } from "../helper.tsx/db";
const CommentRouter = Router();


CommentRouter.post("/:issueId" ,AuthMiddleware, async(req  : Auth,res)=>{
      const userId = req.id;
      if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
      }
      const issueId = req.params.issueId;
      if(!(typeof issueId === "string")){
        return(res.status(400).json({
            message : "BAD_URL"
        }))
      }
      const parsedBody = commentBody.safeParse(req.body);
      if(!parsedBody.success){
        return(res.status(403).json({
            message : "BAD_INPUTS"
        }))
      }
     const {comment} = parsedBody.data ;
      const response = await prisma.comments.create({
        data : {
             comment : comment ,
             userId : userId,
               issueId : issueId
        }
      })
      res.json({
        message : "COMMENT_ADDED"
      })
})


CommentRouter.get("/:issueId" , async(req , res)=>{
    const issueId = req.params.issueId;
    if(!(typeof issueId === "string")){
        return(res.status(400).json({
            message : "BAD_REQUEST"
        }))
    }

    const comments = await prisma.comments.findMany({
        where : {
            issueId : issueId
        }
    })
    res.json({
        comments : comments
    })
})


CommentRouter.patch("/:commentId" ,AuthMiddleware ,async(req :Auth, res)=>{
     const commentId = req.params.commentId;
     if(!(typeof commentId === "string")){
        return(res.status(403).json({
            message : "BAD_URL"
        }))
     }
     const userId = req.id;
     if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
     }
     const response = await prisma.comments.delete({
        where : {
            id : commentId,
            userId : userId
        }
     })

     res.json({
        message : "COMMENT_DELETED"
     })
})