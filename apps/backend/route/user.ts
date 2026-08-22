import { Router } from "express";
import { signupBody , signinBody } from "../helper.ts/db";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const userRouter = Router();
import bcrypt from "bcrypt";
import {prisma} from "db/client";
import { AuthMiddleware, type Auth } from "../helper.ts/auth";
userRouter.post("/signup" , async (req,res)=>{
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
        password : password,
        role :"user"
       }
    })
    res.json({
        message : "User signed up"
    })
})

userRouter.post("/signin" , async (req, res)=>{
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
})


userRouter.patch("/role" ,AuthMiddleware, async(req : Auth , res)=>{
     const userId = req.id;
     if(!userId){
        return(res.status(403).json({
            message : "BAD_REQUEST"
        }))
     }

     const updateRole = await prisma.user.update({
        where : {
            id : userId
        } ,
        data : {
            role : "admin"
        }
     })
     res.json({
        message :"ROLE_UPDATED"
     })
})