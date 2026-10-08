console.log("WS RAN")
import { prisma } from "db/client";
import type WebSocket from "ws";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port : 4000});
wss.on("connection" , async(ws  , req)=>{
 if(req.url === undefined){
    return(
        ws.send(JSON.stringify({
            type : "REQ.URL_IS_UNDEFINED",
            message : "SOMETHING_WENT_WRONG"
        }))
    )
 }
    const url = new URL(req.url , "http://localhost:4000");
    const boardId =  url.pathname.split("/")[2];

  const issues =   await prisma.issue.findMany({
        where : {
            boardId : boardId
        }
    })
    ws.send(JSON.stringify({
        type : "INITIAL_STATE",
              issues : issues
    }))

})

