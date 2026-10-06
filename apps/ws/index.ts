console.log("WS RAN")
import { prisma } from "db/client";
import type WebSocket from "ws";
import { WebSocketServer } from "ws";
interface Issues {
    id : string,
    title : string,
    status : "done"| "in_progress"|"upcoming"
}
const wss = new WebSocketServer({port : 4000});
let Issues  : Issues[]= [{
    id : "fdkfjdg",
    title : 'dfg',
    status : "done"
}, {
    id : "dfghf",
    title : "dfjig",
    status : "upcoming"
}]
// async function getIssues(){
//    const issues = await prisma.issue.findMany({
   
//    })
// }

let connection :WebSocket[] = []
wss.on("connection" , (ws , req)=>{
    console.log("URL =" , req.url)
    const url = new URL(req.url!, "http://localhost:4000");
console.log("URL 2" , url)
     const parts = url.pathname.split("/");
     const boardId = parts[2]
     console.log("boardId -" , boardId)


//    getIssues()
    console.log("server connected")
    connection.push(ws)
    ws.send(JSON.stringify({
        type : "Initial_state",
        issues : Issues
    }))
    ws.on("message" , (message)=>{
        const data = JSON.parse(message.toString());
        if(data.type === "add_issue"){
            Issues.push({
                id : data.id,
                title : data.title,
                status : data.status
            })
        }
        console.log("issue", Issues)
        connection.forEach((con)=> con.send(JSON.stringify({
            type : "Issue_added",
            issues : Issues
        })))
    })
})