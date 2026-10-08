console.log("WS RAN")
import { prisma } from "db/client";
import type WebSocket from "ws";
import { WebSocketServer } from "ws";
let CONNECTIONS = [];
const wss = new WebSocketServer({port : 4000});
async function addIssue(title : string , status : "done" | "in_progress" | "upcoming" , boardId : string){
  const issue =   await prisma.issue.create({
       data : {
        boardId : boardId,
        title : title,
        status : status
       }
    })
    return issue
}
wss.on("connection" , async(ws  , req)=>{
    CONNECTIONS.push(ws)
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
if(!boardId){
  return(  ws.send(JSON.stringify({
        type : "SOMETHING_WENT_WRONG"
    }))
)
}
  const issues =   await prisma.issue.findMany({
        where : {
            boardId : boardId
        }
    })
    ws.send(JSON.stringify({
        type : "INITIAL_STATE",
              issues : issues
    }))

    ws.on("message" , async(message)=>{
        const data = JSON.parse(message.toString());
        console.log('DATA =' , data)
        if(data.type === "ADD_ISSUE"){
         await addIssue(data.title , data.status ,boardId );

       CONNECTIONS.forEach(ws=>{
        ws.send(JSON.stringify({
            type : "ISSUE_ADDED",
             issues : addIssue
         }))
       })  
        }

    })

})

