import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";
interface Issues{
  id : string,
  title : string,
  status : "done" | "in_progress" | "upcoming"
}

export function App(){
  const [issues , setIssues] = useState<Issues[]>([]);
  const [socket , setsocket] = useState<WebSocket | null>(null);
  const [input , setInput] = useState("")
  useEffect(()=>{ 
     const ws  = new WebSocket("ws://localhost:4000");
     setsocket(ws);
     ws.onmessage = (ev)=>{
      const parsedData = JSON.parse(ev.data);
      if(parsedData.type === "Initial_state"){
        setIssues(parsedData.issues);
      }
      if(parsedData.type === "Issue_added"){
        setIssues(parsedData.issues);
        console.log("issues =", issues)
      }
     }
  },[])

  return(
    <div style={{display : "flex"}}>
         <div style={{flex : 1}}>
               DONE 
               {issues.filter((i)=> i.status === "done").map(i=> <div key={i.id}> {i.title}</div>)}
               <div style={{display : "flex" , flexDirection : "column" ,width : 100}}>
                               <button onClick={()=>{
                                socket?.send(JSON.stringify({
                                  type : "add_issue",
                                  id : Math.random(),
                                  title : input,
                                  status : "done"
                                }))
                               }}>Add issue</button>
             <input type="text" placeholder="add title" onChange={(e)=>{
                 setInput(e.target.value)
             }}/>
               </div>

         </div>
          <div style={{flex : 1}}>
            UPCOMING
            {issues.filter((i)=> i.status === "upcoming").map(i => <div key={i.id}>{i.title}</div>)}
                                         <div style={{display : "flex" , flexDirection : "column" ,width : 100}}>
                               <button
                                     onClick={()=>{
                                socket?.send(JSON.stringify({
                                  type : "add_issue",
                                  id : Math.random(),
                                  title : input,
                                  status : "upcoming"
                                }))
                              }}>Add issue</button>
             <input type="text" placeholder="add title" onChange={(e)=>{
              setInput(e.target.value)
             }}/>
               </div>
          </div>
           <div style={{flex : 1}}>
             IN_PROGRESS
             {issues.filter((i)=> i.status === "in_progress").map(i => <div key={i.id}>{i.title} </div>)}
                                          <div style={{display : "flex" , flexDirection : "column" ,width : 100}}>
                                <button
                                     onClick={()=>{
                                socket?.send(JSON.stringify({
                                  type : "add_issue",
                                  id : Math.random(),
                                  title : input,
                                  status : "in_progress"
                                }))
                              }}>Add issue</button>
             <input type="text" placeholder="add title" onChange={(e)=>{
              setInput(e.target.value)
             }}/>
               </div>
           </div>
    </div>
  )
}

export default App;
