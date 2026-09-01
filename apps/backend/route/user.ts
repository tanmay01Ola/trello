import { Router } from "express";
import { signupBody , signinBody, inviteBody, removeBody } from "../helper.tsx/db";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const userRouter = Router();
import bcrypt from "bcrypt";
import {prisma} from "db/client";
import { AuthMiddleware , hasRole, type Auth } from "../helper.tsx/auth";
userRouter.post("/signup" , async (req,res)=>{
    try {
    const body = signupBody.safeParse(req.body);
    if(!body.success){
        return(res.status(400).json({
            message : body.error.message
        }))
    }
    const {username , email , password} = req.body;
    const hashdPassword = await bcrypt.hash(password , 10);
    const response = await prisma.user.create({
       data : {
        username : username,
        email : email, 
        password : hashdPassword
       }
    })
    res.json({
        message : "User signed up"
    })
}   catch(err : any){
    if(err.code === "P2002"){
        return(res.status(409).json({
            message : "UNIQUE_CONSTRAINT_VOILATED"
        }))

    } 

    return(res.status(500).json({
        message : "INTERNAL_SERVER_ERROR"
    }))

}
})

userRouter.post("/signin" , async (req, res)=>{
    try {
    const body = signinBody.safeParse(req.body);
    if(!body.success){
        return(res.status(400).json({
            message : "bad inputs"
        }))
    }
    const {email , password} = body.data;
    const user = await prisma.user.findFirst({
       where : {
          email : email
       }
    })
    if(!user){
        return(
            res.status(400).json({
                message : "EMAIL_NOT_SIGNED_UP"
            })
        )
    }
    const token = jwt.sign({
        id : user.id
    }, (JWT_SECRET)!)

    res.json({
        message : "USER_LOGGED_IN",
        token : token
    })
} catch(err){
    return(res.status(500).json({
        message : "INTERNAL_SERVER_ERROR"
    }))
}
})


userRouter.post("/invite/:orgId", AuthMiddleware ,async (req : Auth ,res)=>{
    const userId = req.id;
    if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
    }
     const orgId = req.params.orgId ;
     if(!(typeof orgId === "string")){
        return(res.status(400).json({
            message : "BAD_REQUEST"
        }))
     }
    if(await hasRole(userId , orgId) === "user"){
         return(res.status(409).json({
            message : "UNAUTHORIZED"
         }))
    }
    const parsedBody = inviteBody.safeParse(req.body);
    if(!parsedBody.success){
        return(res.status(400).json({
            message : "BAD_INPUTS"
        }))
    }
    const {inviteId} = parsedBody.data;
    const findUser = await prisma.user.findFirst({
        where : {
            id : inviteId
        }
    })
    if(!findUser){
        return(res.status(404).json({
            message : "USER_NOT_SIGNED_UP"
        }))
    }
    const invite = await prisma.invites.create({
        data : {
            orgId : orgId,
            userId : inviteId
        }
    }) 

    res.json({
        message : "INVITE_SENT"
    })
})


userRouter.post("/accept/:orgId", AuthMiddleware ,async (req : Auth ,res)=>{
    const userId = req.id;
    if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
    }
   const orgId = req.params.orgId;
   if(!(typeof orgId === "string")){
    return(res.status(400).json({
        message : "BAD_REQUEST"
    }))
   }
    const accept =await prisma.invites.update({
        where : {
            id : userId,
           orgId : orgId
        } , data : {
            accepted :true
        }
    })

    res.json({
        message : "INVITE_ACCEPTED"
    })
})


userRouter.post("/remove/:orgId" , AuthMiddleware ,async (req : Auth , res)=>{
    const userId = req.id;
    if(!userId){
        return(res.status(400).json({
            message : "BAD_REQUEST"
        }))
    }
     const orgId = req.params.orgId;
     if(!(typeof orgId === "string")){
        return(res.status(400).json({
            message : "BAD_URL"
        }))
     }
    const parsedBody = removeBody.safeParse(req.body);
    if(!parsedBody.success){
        return(res.status(403).json({
            message : "BAD_INPUTS"
        }))
    }
    const {user} = parsedBody.data;
     if(!(await hasRole(userId ,orgId ) === "admin")){
        return(res.status(403).json({
            message :  "ONLY_ADMIN_CAN_REMOVE_USER_FROM_ORG"
        }))
     }
     const member = await prisma.members.findFirst({
        where : {
            userId : user,
            orgId : orgId
        }
     })

     const removeUser = await prisma.members.delete({
        where : {
            id : member?.id
        }
     })

     res.json({
        message : "USER_REMOVED_FROM_ORG"
     })
})

userRouter.post("/leave/:orgId" , AuthMiddleware , async(req : Auth ,res)=>{
      const orgId = req.params.orgId;
      if(!(typeof orgId === "string")){
        return(res.status(400).json({
            message : "BAD_URL"
        }))
      }
      const userId = req.id;
      if(!userId){
        return(res.status(400).json({
            message : "BAD_REQUEST"
        }))
      }
      const USER = await prisma.members.findUnique({
        where : {
            id : userId
        }
      })
      const leave = await prisma.members.delete({
        where : {
            id : USER?.id
        }
      })
      res.json({
        message : "ORG_LEFT"
      })
})

