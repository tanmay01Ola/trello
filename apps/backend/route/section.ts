import { Router  } from "express";
import { sectionBody } from "../helper.tsx/db";
import { AuthMiddleware, type Auth } from "../helper.tsx/auth";
import { prisma } from "db/client";
const sectionRouter = Router();


sectionRouter.post("/:boardId" ,AuthMiddleware, async(req : Auth ,res)=>{
    const userId = req.id;
    if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
    }
    const boardId = req.params.id;
    if(!(typeof boardId === "string")){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
    }
    const parsedBody = sectionBody.safeParse(req.body);
    if(!parsedBody.success){
        return(res.status(403).json({
            message : "BAD_INPUTS"
        }))
    }
    const {name} = parsedBody.data;

    const Response = await prisma.section.create({
        data : { 
            boardId : boardId,
            title : name
        }
    })
    res.json({
        message : "SECTION_ADDED"
    })
})

sectionRouter.patch("/delete/:sectionId" ,AuthMiddleware,async (req : Auth , res)=>{
    const userId = req.id;
    if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
    }
    const sectionId = req.params.id;
    if(!(typeof sectionId === "string")){
        return(res.status(400).json({
            message : "BAD_REQUEST"
        }))
    }
    const deleteSection = await prisma.section.delete({
        where : {
            id : sectionId
        }
    })


    res.json({
        message : "DELETED_SECTION"
    })
})
