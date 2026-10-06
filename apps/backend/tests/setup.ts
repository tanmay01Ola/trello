
import { app } from ".././index.ts";
import {createServer, Server} from "node:http"
import {afterAll, beforeAll } from "bun:test";
import { CreateUser } from "./helper/createUser.ts";
import { DeleteUser } from "./helper/deleteUser.ts";

export let server  : Server
  export let PORT  : number
  export let token : string;
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
       console.log("BEFORE HASHING PASSWORD IN BEFOREALL")
       CreateUser()
 })
    afterAll(async()=>{
      DeleteUser()
      
        server.close()
 })