import dotenv from "dotenv"
dotenv.config({
  path: "../../.env",
})
import express from "express";
import cors from "cors";
import { userRouter } from "./route/user";
import { orgRouter } from "./route/org";
import { issueRouter } from "./route/issue";
import { boardRouter } from "./route/board";
import { healthRouter } from "./route/health";
export const app = express()
app.use(express.json());
app.use(cors())
app.use("/user",userRouter);
app.use("/org" ,orgRouter);
app.use("/issues" , issueRouter);
app.use("/board", boardRouter);
app.use("/health" , healthRouter)
