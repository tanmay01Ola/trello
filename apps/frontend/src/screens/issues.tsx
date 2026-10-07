
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
   useEffect(()=>{
    async function HandleIssues(){
         await axios.get(`http://localhost:3006/issues/${orgId}/${boardId}` ,{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
         })
         .then((response)=>{
            console.log("RESPONSE2=" , response.data.issues)

            setIssues(response.data.issues)
         })
    }
    HandleIssues()
   }, [])
   console.log("ISSUES =" , issues)
   return(
     <div style={{display : "flex"}}>
        <div style={{flex : 1}}>
             DONE
         {issues.filter(issue=> issue.status === "done").map(issue => <div key={issue.id}>{issue.title}</div>)}
        </div>
        <div style={{flex : 1}}>
            IN_PROGRESS
            {issues.filter(issue=> issue.status === "in_progress").map(issue=> <div key={issue.id}>{issue.title}</div>)}
        </div>
        <div style={{flex : 1}}>
            UPCOMING
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