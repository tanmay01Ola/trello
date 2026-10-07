import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
    const token = localStorage.getItem("token")
console.log("TOKENN -" , token)
interface Org {
    id : string
    name : string
}
export function OrgPage(){
    const navigate = useNavigate()
        const [org , setOrg] = useState<Org[]>([])
     async function getOrg(){
        await axios.get("http://localhost:3006/org" , {
        headers : {
            "Authorization" :`Bearer ${token}`
        }
    }).then(response=>{
        setOrg(response.data.members.map((member : any) => member.org))
    })
  }
    useEffect(()=>{
              getOrg()
    }, [])
 return(
    <div>
         <div>
                  {org?.map(org => <div onClick={()=>{
                    navigate(`/boards/${org.id}`)
                  }} key={org.id}>{org.name}</div>)}
         </div>
    </div>
 )
}