
import axios from "axios";

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
interface Issue {
    id : string,
    title : string,
    status : "done" | "in_progress" | "upcoming"
}
interface user {
    id : string,
    username :string,
    profilePic? : string
}

export function Issues(){
    const token = localStorage.getItem("token")
      const  {boardId , orgId} = useParams() ;
    const [issues  , setIssues] = useState<Issue[]>([])
    const [doneTitle , setDoneTitle] = useState("");
    const [InProgressTitle , setInProgressTitle] = useState("");
    const [upcomingTitle , setUpcomingTitle] = useState("");
    const [socket , setSocket] = useState<WebSocket>() ;
    const [user , setUser] = useState<user[]>([])
   useEffect(()=>{
    const ws = new WebSocket(`ws://localhost:4000/issues/${boardId}?token=${encodeURIComponent(token ?? "")}`)
    setSocket(ws)
     ws.onmessage = (ev)=>{
       const data =  JSON.parse(ev.data);
       console.log("DATA =" , data.user);
        if(data.type === "INITIAL_STATE"){
           setIssues(data.issues)
           setUser(data.user)
        }
        if(data.type === "ISSUE_ADDED"){
            setIssues((prev)=> [...prev , data.issue])
        }
     }
   }, [])
   return(
    <div style={{display : "flex" , justifyContent : "space-between"}}>
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
          <div> 
           {user.map(user=> <div key={user.id}>{user.profilePic ? user.profilePic : user.username}</div>)}
               
          </div>
      </div>

   )
}