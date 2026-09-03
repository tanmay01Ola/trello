import axios from "axios"
import { useState } from "react"

export function Signup(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [username , setUsername] = useState("");
    const [error , setError] = useState("");
    const [loading , setLoading] = useState(false)
   async function handleRequest(){
        setError("")
        if(!email){
        setError("email is required")
        return
        }
        if(!(email.includes("@"))){
            setError("enter valid email")
            return
        }
        if(!password){
            setError("password is required")
            return
        }
        if(!username){
            setError("username is required")
            return
        }
        try{
            setLoading(true);
            console.log("before response")
            const response = await axios.post("http://localhost:3006/user/signup", {
                email ,
                password , 
                username
            })
    } catch(err){
        if(axios.isAxiosError(err)){
            console.log(err.response?.status);
            console.log(err.response?.data)
           setError(err.response?.data.message)
        }
    } finally {
        (setLoading(false))
    }
}
    return(
        <div>
             <div>
              <input type="text" placeholder="email" onChange={(e)=>{
                setEmail(e.target.value)
              }}/>
             <input type="text" placeholder="password" onChange={(e)=>{
                setPassword(e.target.value)
             }}/>
             <input type="text" placeholder="username" onChange={(e)=>{
                setUsername(e.target.value)
             }} />
             {error && <p>{error}</p>}
             </div>
             <div>
                 <button onClick={handleRequest}>{loading ? "loading...": "signup"}</button>
             </div>

        </div>
    )
}