import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./index.css";
interface Issues{
  id : string,
  title : string,
  status : "done" | "in_progress" | "upcoming"
}
const boardId = useParams()
export function App() {
  const [issues , setIssues] = useState<Issues[]>([])
  console.log("issues=" , issues)
  const [socket , setSocket] = useState<WebSocket>();
  const [status , setStatus] = useState("upcoming");
  const [issueTitle , setissueTitle] = useState("")
  useEffect(()=>{
  const ws = new WebSocket("ws://localhost:3010");
  setSocket(ws);
  ws.onmessage = (ev)=>{
    const data  = ev.data;
    const parsedData = JSON.parse(data);
    console.log("here=",parsedData)
    if(parsedData.type === "INITIAL_ISSUES"){
      setIssues(parsedData.issues)
    }
    if(parsedData.type === "issue_added"){
       console.log("heehehe" ,  parsedData)
      setIssues(parsedData.issues);
      console.log("dfisdjf" , issues)
    }
  }
  } , [])
  return (
    <div>
      <div style={{display : "flex" , justifyContent : "space-between"}}>
        <div>
            DONE
            {issues.filter(i =>i.status === "done").map((issue)=><div>{issue.title}</div> )}
           </div>
           <div>
            IN_PROGRESS
            {issues.filter(i => i.status === "in_progress").map((issue)=> <div key={issue.id}>{issue.title}</div>)}
           </div>
           <div>
               UPCOMING
               {issues.filter(i => i.status === "upcoming").map((issue) => <div key={issue.id}> {issue.title}</div>)}
           </div>
      </div>
      <div style={{display : "flex", padding : "40vh" }}>
           <input type="text" placeholder="add title" onChange={(e)=>{
            setissueTitle(e.target.value)
           }} />
           <select value={status} onChange={(e)=>{
            setStatus(e.target.value)
           }}>
           <option value="done">Done</option>
           <option value="in_progress">In progress</option>
           <option value="upcoming">Upcoming</option>
           </select>
                    <button onClick={(e)=>{
            socket?.send(JSON.stringify({
                    type : "add_issue",
                    boardId : boardId,
                     title : issueTitle,
                     status : status                  
            }))
           }}>Add issue</button>
      </div>

    </div>
  );
}

export default App;
