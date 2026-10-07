
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
interface issue {
    id : string,
    title : string,
    status : "done" | "in_progress" | "upcoming"
}

export function Issues(){
    console.log("ISSUES COMPONENT")
    const token = localStorage.getItem("token")
      const  {boardId , orgId} = useParams() ;
    const [issues  , setIssues] = useState()
   useEffect(()=>{
    async function HandleIssues(){
         await axios.get(`http://localhost:3006/issues/${orgId}/${boardId}` ,{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
         })
         .then((response)=>{
            console.log("RESPONSE =" , response.data)
         })
    }
    HandleIssues()
   }, [])
   return(
    <div>
        hiiii
    </div>
   )
    //  return(
        // <div style={{display : "flex"}}>
        //       <div style={{flex : 1}}>
        //           DONE 
        //           {issues.filter((i)=> i.status === "done").map(i => <div key={i.id}>{i.title}</div>)}
        //             <input type="text" placeholder="add title" onChange={(e)=>{
        //                 setDoneValue(e.target.value)
        //             }} />
        //              <button onClick={()=>{
        //                  socket?.send(JSON.stringify({
        //                     type : "add_issue",
        //                     id : Math.random(),
        //                     title : doneValue,
        //                     status : "done"
        //                  }))
        //              }}>ADD ISSUES</button>
                
        //       </div>
        //       <div style={{flex : 1}}>
        //          IN_PROGRESS 
        //          {issues.filter((i)=> i.status=== "in_progress").map(i => <div key={i.id}> {i.title}</div>)}
        //            <input type="text" placeholder="add title" onChange={(e)=>{
        //               setProgress(e.target.value)
        //            }} />
        //              <button onClick={()=>{
        //                 socket?.send(JSON.stringify({
        //                     type : "add_issue",
        //                     title : progress,
        //                     id : Math.random(),
        //                     status : "in_progress"
        //                 }))
        //              }}>ADD ISSUES</button>
                
        //       </div>
        //       <div style={{flex :1 }}>
        //            UPCOMING
        //            {issues.filter((i)=> i.status === "upcoming").map( i=> <div key={i.id}>{i.title}</div>)}
        //              <input type="text" placeholder="add title" onChange={(e)=>{
        //                 setupcoming(e.target.value)
        //              }} />
        //              <button onClick={()=>{
        //                  socket?.send(JSON.stringify({
        //                     type : "add_issue",
        //                     id : Math.random(),
        //                     title : upcoming,
        //                     status : "upcoming"
        //                  }))
        //              }}>ADD ISSUES</button>
        //       </div>
            
                  
        // </div>
    // )
}