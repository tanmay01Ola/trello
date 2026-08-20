import {prisma} from "db/client";
import express from "express";
import { signinBody, signupBody } from "./db";
import cors from "cors";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const app = express();
const JWT_SECRET = process.env.JWT_SECRET;
if(JWT_SECRET === "undefined"){
    throw new Error("JWT_SECRET_NOT_SETUP")
}
app.use(cors())
app.use(express.json());

app.post("/signup" , async (req,res)=>{
    const body = signupBody.safeParse(req.body);
    if(!body.success){
        return(res.status(400).json({
            message : body.error.message
        }))
    }
    const {username , email , password} = req.body;
    const hashdPassword = await bcrypt.hash(password , 10);
    const response = await prisma.user.create({
        data  : {
            username : username,
            password : hashdPassword,
            email : email
        }
    })
    res.json({
        message : "User signed up"
    })
})

app.post("/signin" , async (req, res)=>{
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
})
app.listen(3006);