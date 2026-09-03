import axios from "axios"
import { useState } from "react"

export function Signin(){
    const [email , setemail] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState("");
    const [loading , setLoading] = useState(false);
    async function handleLogin(){
        setError("");
        if(!email){
            setError("EMAIL_IS_REQUIRED")
            return
        }
        if(!(email.includes("@"))){
            setError("ENTER_VALID_EMAIL")
            return
        }
        if(!password){
            setError("PASSWORD_IS_REQUIRED")
            return
        }
        console.log("INPUTS_ARE_VALID")
         try{
           setLoading(true);
         const response = await axios.post("http://localhost:3006/user/signin" , {
            email,
            password
         })
         console.log("respne" , response.data)
     }
      catch(err){
       if(axios.isAxiosError(err)){
            console.log(err.response?.data);
            console.log(err.response?.status)
            setError(err.response?.data.message || "something went wrong") ;
         }
     } finally{
        setLoading(false)
     }
    }


    return(
        <div>
             <input type="text" placeholder="email" onChange={(e)=>{
                setemail(e.target.value)
             }} />
             <input type="text" placeholder="password" onChange={(e)=>{
                setPassword(e.target.value)
             }} /> 
             {error && <p>{error}</p>}
             <button onClick={handleLogin}

             >{loading ? "logging in..." : "login"}</button>
        </div>
    )
}