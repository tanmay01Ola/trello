import { expect, test } from "bun:test";
import { PORT } from "./setup";
import {token} from "./setup";
import type { Body } from "./setup";
// interface OrgBody extends Body {
//     orgId : string
// }
console.log("BEFORE ORG TEST")
test("CREATE ORG" , async()=>{
    console.log("ORG TESTS")
   const response = await fetch(`http://localhost:${PORT}/org` , {
    method : "POST",
    headers : {
        "Content-Type"  : "application/json",
        "Authorization"   :  `Bearer ${token}`
    } , 
    body : JSON.stringify({
        name : "dfdsgdff"
    })
   })
   const body = await response.json() as Body;
   console.log("BODY = " , body)
   expect(body.message).toBe("ORG_CREATED");
   expect(response.status).toBe(200)
})


// test("WRONG_NAME" , async()=>{
//     const response = await fetch(`http://localhost:${PORT}/org` , {
//         method : "POST",
//         headers : {
//             "Content-Type" : "application/json"
//         } ,
//         body : JSON.stringify({
//             name : "SAFJKHD"
//         })
//     })
//     const body = await response.json() as Body;
//     expect(body.message).toBe();
//     expect(response.status).toBe(400)
// })
// afterAll(async()=>{
//     if(!(ID === undefined)){
//             await prisma.user.delete({
//         where : {
//             id : ID
//         }
//     })
//     }
//     ID = undefined
// })