import { afterAll, beforeAll, expect, test } from "bun:test";
import { PORT } from "./setup";
import jwt from "jsonwebtoken";
import { prisma } from "db/client";
const JWT_SECRET = "TANMAY123";
let token : string;
let ID : string | undefined;
import type { Body } from "./setup";
interface OrgBody extends Body {
    orgId : string
}
beforeAll(async()=>{
    const user = await prisma.user.create({
        data : {
             username : "gfdjklkl",
             email : "tgfhkjlmay@gmail.com",
             password : "tanmay"
        }
    })
       ID = user.id;

        token = jwt.sign({
        id : ID
       }, JWT_SECRET)
})
test("CREATE ORG" , async()=>{
    console.log("TOKEN " , token)
   const response = await fetch(`http://localhost:${PORT}/org/` , {
    method : "POST",
    headers : {
        "Content-Type"  : "application/json",
        "Authorization"   :  `Bearer ${token}`
    } , 
    body : JSON.stringify({
        name : "zomato"
    })
   })
   console.log( "RESPONSE",await response.json())
   const body = await response.json() as OrgBody;
   console.log("BODY = " , body)
   expect(body.message).toBe("ORG_CREATED");
   expect(response.status).toBe(200)
})

afterAll(async()=>{
    if(!(ID === undefined)){
            await prisma.user.delete({
        where : {
            id : ID
        }
    })
    }
    ID = undefined
})