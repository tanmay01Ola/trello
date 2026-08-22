
import express from "express";
import cors from "cors";
import { signinBody } from "./helper.ts/db";
import { userRouter } from "./route/user";
const app = express();
app.use(cors())
app.use("/user",userRouter)
app.use(express.json());


app.listen(3006);