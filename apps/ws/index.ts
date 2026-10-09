console.log("WS RAN")
import { prisma } from "db/client";
import type WebSocket from "ws";
const JWT_SECRET = process.env.JWT_SECRET ;
import { WebSocketServer } from "ws";
let CONNECTIONS = [];
let users = [];
import jwt from "jsonwebtoken"
 interface payload {
    id : string
}
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
    console.log("URL ===", url.searchParams.get("token"))
    const token = url.searchParams.get("token");
    if(!token){
        return(
            ws.send(JSON.stringify({
                message : "BAD_REQUEST"
            }))
        )
    }
    const payload = jwt.verify(token ,(JWT_SECRET)! ) as payload
    const userId =payload.id ;
    const user = await prisma.user.findFirst({
        where  :{
            id : userId
        } ,
        select : {
            id : true,
            username : true,
            profilePic : true
        }
    })
        CONNECTIONS.push({
            socket : ws 
        });
        users.push(user)

     console.log("CONN ====" , CONNECTIONS)
       
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
              issues : issues ,
              user : users    
    }))

    ws.on("message" , async(message)=>{
        const data = JSON.parse(message.toString());
        console.log('DATA =' , data)
        if(data.type === "ADD_ISSUE"){
      const issues =   await prisma.issue.create({
            data : {
                title : data.title,
                status : data.status,
                boardId : boardId
            }
        })

       CONNECTIONS.forEach(ws=>ws.socket.send(JSON.stringify({
           type : "ISSUE_ADDED",
           issue : issues
       })))  
        }

    })

})

