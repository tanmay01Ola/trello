import dotenv from "dotenv"
dotenv.config({
  path: "../../.env",
})
import express from "express";
import cors from "cors";
import { userRouter } from "./route/user";
import { orgRouter } from "./route/org";
const app = express();
app.use(express.json());
app.use(cors())
app.use("/user",userRouter);
app.use("/org" ,orgRouter)
app.listen(3006);