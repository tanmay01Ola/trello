import { Router } from "express";
import { type Auth , AuthMiddleware , hasRole } from "../helper.tsx/auth";
import { prisma } from "db/client";
import { boardBody } from "../helper.tsx/db";
import { use } from "react";
const boardRouter = Router();


boardRouter.post("/board/:orgId" ,AuthMiddleware, async (req : Auth ,res)=>{
      const userId = req.id;
      if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
      }
   const orgId = req.params.id;
   if(!(typeof orgId === "string")){
    return(res.status(400).json({
        message : 'BAD_REQUEST'
    }))
   }
   if(await hasRole(userId) === "user"){
    return(res.status(401).json({
        message :"UNAUTHORIZED"
    }))
   }
   const parsedBody = boardBody.safeParse(req.body);
   if(!parsedBody.success){
    return(res.status(400).json({
        message : "BAD_INPUTS"
    }))
   }
   const {name} =parsedBody.data;
   const board = await prisma.boards.create({
    data : {
        BoardName : name,
        orgId : orgId,
    }
   })
   res.json({
    message : "BOARD_CREATED",
    id : board.id
   })

})
boardRouter.delete("/delete/:boardId" , AuthMiddleware,async(req: Auth ,res)=>{
       const userId = req.id;
       if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
       }
       const boardId = req.params.boardId;
       if(!(typeof boardId === "string")){
        return(res.status(400).json({
            message  : "BAD_REQUEST"
        }))
       }
       if(await hasRole(userId) === "user"){
            return(res.status(403).json({
                 message : "UNAUTHORIZED"
            }))
       }
       await prisma.boards.delete({
        where : {
            id : boardId
        }
       })
       res.json({
        message :"BOARD_DELETED"
       })
})

boardRouter.get("/:orgId" ,AuthMiddleware,async (req  : Auth,res)=>{
      const userId = req.id;
      if(!userId){
        return(res.status(400).json({
            message : "BAD_REQUEST"
        }))
      }
      const orgId = req.params.id;
      if(!(typeof orgId === "string")){
           return(res.status(400).json({
            message : "BAD_REQUEST"
           }))
      }
      const getBoards = await prisma.boards.findMany({
        where : {
            orgId : orgId
        }
      })

      res.json({
        boards : getBoards
      })
})
