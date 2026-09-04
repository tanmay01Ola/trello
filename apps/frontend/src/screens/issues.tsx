import axios from "axios";
import { password } from "bun";
import { useEffect, useState } from "react"
interface issue {
    id : string,
    title : string,
    status : "done" | "in_progress" | "upcoming"
}
export function Issues(){
 const [issues , setissues] = useState<issue[]>([]);
 const [socket , setSocket] = useState<WebSocket |null>(null)
 const [doneValue , setDoneValue] = useState("");
 const [progress , setProgress] = useState("");
 const [upcoming , setupcoming] = useState("")
 useEffect(()=>{
     const ws = new WebSocket("ws://localhost:4000");
     setSocket(ws);
      ws.onmessage = (message)=>{
        const parsedData = JSON.parse(message.data.toString());
        if(parsedData.type === "Initial_state"){
            setissues(parsedData.issues)  
        }
        if(parsedData.type === "Issue_added"){
            setissues(parsedData.issues);
        }
      }
 },[])
     return(
        <div style={{display : "flex"}}>
              <div style={{flex : 1}}>
                  DONE 
                  {issues.filter((i)=> i.status === "done").map(i => <div key={i.id}>{i.title}</div>)}
                    <input type="text" placeholder="add title" onChange={(e)=>{
                        setDoneValue(e.target.value)
                    }} />
                     <button onClick={()=>{
                         socket?.send(JSON.stringify({
                            type : "add_issue",
                            id : Math.random(),
                            title : doneValue,
                            status : "done"
                         }))
                     }}>ADD ISSUES</button>
                
              </div>
              <div style={{flex : 1}}>
                 IN_PROGRESS 
                 {issues.filter((i)=> i.status=== "in_progress").map(i => <div key={i.id}> {i.title}</div>)}
                   <input type="text" placeholder="add title" onChange={(e)=>{
                      setProgress(e.target.value)
                   }} />
                     <button onClick={()=>{
                        socket?.send(JSON.stringify({
                            type : "add_issue",
                            title : progress,
                            id : Math.random(),
                            status : "in_progress"
                        }))
                     }}>ADD ISSUES</button>
                
              </div>
              <div style={{flex :1 }}>
                   UPCOMING
                   {issues.filter((i)=> i.status === "upcoming").map( i=> <div key={i.id}>{i.title}</div>)}
                     <input type="text" placeholder="add title" onChange={(e)=>{
                        setupcoming(e.target.value)
                     }} />
                     <button onClick={()=>{
                         socket?.send(JSON.stringify({
                            type : "add_issue",
                            id : Math.random(),
                            title : upcoming,
                            status : "upcoming"
                         }))
                     }}>ADD ISSUES</button>
              </div>
            
                  
        </div>
    )
}