import axios from "axios"
import { useState } from "react"
export function Signup(){
   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("");
   const [username , setUsername] = useState("")
    return(
        <div >
                 <div style={{display : "flex" , flexDirection : "column" , alignItems : "center" , paddingTop : "45vh" }}>
                               <input className="SignupInput" onChange={(e)=>{
                setEmail(e.target.value)
               }} type="text" value={email} placeholder="email" />
                               <input className="SignupInput" onChange={(e)=>{
                setPassword(e.target.value)
               }} type="text" placeholder="password" />
               <input className="SignupInput" onChange={(e)=>{
                setUsername(e.target.value)
               }} type="text"  placeholder="username"/>
               <button style={{width : 250 , borderRadius : 10 , height : 40}} onClick={()=>{
                axios.post("http://localhost:3000") , {
                    email : email,
                    password : password,
                    username  : username 
                }
               }}>Signup</button>
                          </div>
        </div>
    )
}