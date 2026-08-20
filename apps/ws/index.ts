import { prisma } from "db/client";
import { WebSocketServer } from "ws";
interface issue {
    id : string,
    title : string,
    status : "done" | "in_progress" | "upcoming"
}
let issues : issue[] = []

let connections   = []
const ws = new WebSocketServer({port : 3010});

ws.on("connection" ,(socket)=>{
    connections.push(socket);
    socket.send(JSON.stringify({
        type : "INITIAL_ISSUES",
        issues : issues
    }))
    socket.on("message" ,async (message)=>{
        const parsedData = JSON.parse(message.toString());
        console.log("data2", parsedData)
        if(parsedData.type === "add_issue"){
          await  prisma.issue.create({
                data : {
                    boardId : parsedData.boardId,
                    title : parsedData.title,
                    status : parsedData.status,
                }
            })
            const newIssue = {
                title : parsedData.title,
                status : parsedData.status,
                id : parsedData.id
            }
        issues.push(newIssue);
        console.log(issues)
       connections.forEach((con)=> con.send(JSON.stringify({
                type : "issue_added",
                issues : issues
       })))
        }
    })
} )


