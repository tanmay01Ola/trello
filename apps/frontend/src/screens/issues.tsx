
import axios from "axios";

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
interface Issue {
    id : string,
    title : string,
    status : "done" | "in_progress" | "upcoming"
}

export function Issues(){
    console.log("ISSUES COMPONENT")
    const token = localStorage.getItem("token")
      const  {boardId , orgId} = useParams() ;
    const [issues  , setIssues] = useState<Issue[]>([])
    const [doneTitle , setDoneTitle] = useState("");
    const [InProgressTitle , setInProgressTitle] = useState("");
    const [upcomingTitle , setUpcomingTitle] = useState("");
    const [socket , setSocket] = useState<WebSocket>()
   useEffect(()=>{
    const ws = new WebSocket(`ws://localhost:4000/issues/${boardId}`)
    setSocket(ws)
     ws.onmessage = (ev)=>{
       const data =  JSON.parse(ev.data);
        if(data.type === "INITIAL_STATE"){
           setIssues(data.issues)
        }
        if(data.type === "ISSUE_ADDED"){
            setIssues(data.issues)
        }
     }
   }, [])
   return(
     <div style={{display : "flex" , }}>
        <div style={{flex : 1 }}>
             DONE
         {issues.filter(issue=> issue.status === "done").map(issue => <div key={issue.id}>{issue.title}</div>)}
         <input type="text" placeholder="enter title" onChange={(ev)=>{
             setDoneTitle(ev.target.value)
         }} />
         <button onClick={(()=>{
            socket?.send(JSON.stringify({
                type : "ADD_ISSUE",
                status : "done",
                title : doneTitle
            }))
         })}>ADD ISSUE</button>
        </div>
        <div style={{flex : 1}}>
            IN_PROGRESS
              <input type="text" placeholder="enter title" onChange={(ev)=>{
                      setInProgressTitle(ev.target.value)
              }}/>
              <button onClick={()=>{
                socket?.send(JSON.stringify({
                    type : "ADD_ISSUE",
                    title : InProgressTitle,
                    status : "in_progress"
                }))
              }}>ADD ISSUE</button>
            {issues.filter(issue=> issue.status === "in_progress").map(issue=> <div key={issue.id}>{issue.title}</div>)}
        </div>
        <div style={{flex : 1}}>
            UPCOMING
            <input type="text" placeholder="enter title" onChange={(ev)=>{
                   setUpcomingTitle(ev.target.value)
            }} />
            <button onClick={()=>{
                socket?.send(JSON.stringify({
                    type : "ADD_ISSUE",
                    status : "upcoming",
                    title : upcomingTitle
                }))
            }}>ADD issue</button>
            {issues.filter(issue => issue.status === "upcoming").map(issue => <div key={issue.id}>{issue.title}</div>)}
        </div>
     </div>
    // <div style={{display : "flex"}}>
    //     <div style={{flex : 1}}>
    //          DONE
    //          {issues.filter(issue=> {
    //             issue.status ===  'done'
    //          }).map(issue=><div key={issue.id}>
    //             {issue.title}
    //          </div>)}
    //     </div>
    //     <div style={{flex : 1}}>
    //          IN_PROGRESS
    //          {issues.filter(issue=>{
    //             issue.status === "in_progress"
    //          }).map(issue => <div>
    //             {issue.title}
    //          </div>)}
    //     </div>
    //     <div style={{flex : 1}}>
    //         {issues.filter(issue=>{
    //             issue.status === "upcoming"
    //         }).map(issue=><div>
    //             {issue.title}
    //         </div>)}
    //          UPCOMING
    //     </div>
    // </div>
   )
}