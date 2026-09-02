
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
    title : 'djdfg',
    status : "done"
}, {
    id : "dfghf",
    title : "dfjig",
    status : "upcoming"
}]
let connection :WebSocket[] = []
wss.on("connection" , (ws)=>{
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