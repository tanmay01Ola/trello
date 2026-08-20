import {prisma} from "db/client";
import express from "express";
import { signinBody, signupBody } from "./db";
import jwt from "jsonwebtoken"
const JWT_SECRET = "Tanmay123";
const app = express();

app.use(express.json());

app.post("/signup" , async (req,res)=>{
    const body = signupBody.safeParse(req.body);
    if(!body.success){
        return(res.status(400).json({
            message : body.error.message
        }))
    }

    const {username , email , password} = req.body;
    const response = await prisma.user.create({
        data  : {
            username : username,
            password : password,
            email : email
        }
    })
    res.json({
        message : "User signed up"
    })
})

app.post("signin" , async (req, res)=>{
    const body = signinBody.safeParse(req.body);
    if(!body.success){
        return(res.status(400).json({
            message : "bad inputs"
        }))
    }
    const {email , password} = body.data;
    const UserExists = await prisma.user.findFirst({
       where : {
          email : email
       }
    })
    if(!UserExists){
        return(
            res.status(400).json({
                message : "user not signed up"
            })
        )
    }
    const token = jwt.sign({})
})
app.listen(3000);