
import { app } from "../index.ts";
import {createServer, Server} from "node:http"
import {beforeAll , afterAll} from "bun:test";
import { prisma } from "db/client";
const JWT_SECRET = process.env.JWT_SECRET as Secret;
import jwt, { type Secret } from "jsonwebtoken";
export let server  : Server
  export let PORT  : number
  export let token : string;
export let ID : string | undefined;
import bcrypt from "bcrypt"
import { CreateUser } from "./helper/user.ts";
export const password = "tanmay123";
const hashedPassword = await bcrypt.hash(password , 10)
  export interface Body {
    message : string,
    id : string | undefined
}
let address : any;
beforeAll(async()=>{
      server = createServer(app);
      await new Promise<void>((resolve)=>{
         server.listen(0);
         server.on("listening", ()=>{
            resolve()
         })
      })
      address = server.address();
      PORT = address.port;
         CreateUser();
          })


   afterAll(async()=>{
      console.log("ID OF AFTERALL " , ID)
    if(!( ID === undefined)){
      console.log("HERERERERERE")
        await prisma.user.delete({
            where : {
                id : ID 
            } 
        })
    }
    ID = undefined
       server.close()
})
