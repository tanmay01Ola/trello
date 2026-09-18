import { app } from "../index.ts";
import {createServer, Server} from "node:http"
import {beforeAll , afterAll} from "bun:test";
export let server  : Server
  export let PORT  : number
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
})

afterAll(()=>{
   server.close()
})
