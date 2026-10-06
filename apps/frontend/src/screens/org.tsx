import axios from "axios"
import { useEffect, useState } from "react";
    const token = localStorage.getItem("token")
console.log("TOKENN -" , token)
interface Org {
    id : string
    name : string
}
export function OrgPage(){
        const [org , setOrg] = useState<Org[]>([])
    console.log("ORGPAGE RAN")
     async function getOrg(){
    const resp = await axios.get("http://localhost:3006/org" , {
        headers : {
            "Authorization" :`Bearer ${token}`
        }
    }).then(response=>{
        console.log("RESPONSE1=" , response.data)
        console.log("RESPONSE2 = " ,response.data.members )
        // setOrg(response.data.members.map((member) => member.org))
        setOrg(response.data.members.map((member) => member.org))
        console.log("ORG-" ,org)
    })
  }
    useEffect(()=>{
              getOrg()
    }, [])
 return(
    <div>
      {org?.map(org => <div key={org.id}>{org.name}</div>)}
    </div>
 )
}