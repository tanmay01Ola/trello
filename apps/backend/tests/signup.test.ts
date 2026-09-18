
import { expect, test} from "bun:test";
import { afterEach } from "bun:test";
import { prisma } from "db/client";
import type { Body } from "./setup";
let id : string | undefined
let body : Body
import { PORT } from "./setup";
test("CHECK SIGNUP ENDPOINT", async()=>{
     const response = await fetch(`http://localhost:${PORT}/user/signup` , {
        method : "POST",
        headers  : {
                   "Content-Type": "application/json"
        },
        body : JSON.stringify({
            username : "fccvxjdi",
            email : "0vcbcxvchj@gmail.com",
            password : 'dfhjdghjfd'
        })
     })
        body = await response.json() as Body;
     expect(body.message).toBe("User signed up");
     expect(response.status).toBe(200);
     })

 test("UNIQUE_EMAIL_CONSTRAINT" , async()=>{
    const response = await fetch(`http://localhost:${PORT}/user/signup` ,{
        method : "POST",
        headers : {
            "Content-Type"  : "application/json"
        },
        body : JSON.stringify({
                     username : "fghjdi",
            email : "0vcbhj@gmail.com",
            password : 'dfhjdghjfd'
        })
    })
    body = await response.json() as Body;
    expect(body.message).toBe("UNIQUE_CONSTRAINT_VOILATED");
    expect(response.status).toBe(409) 

 })
     test("INVALID_EMAIL_FORMAT" ,async()=>{
        const response = await fetch(`http://localhost:${PORT}/user/signup`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : "tanmdghdfjay",
                email : "taayl",
                password : "tanmay123"
            })
        })
         body = await response.json() as Body;
        expect(body.message).toBe("Invalid email address");
        expect(response.status).toBe(400);
  
     })


     test("SMALL USERNAME" , async()=>{
        const response = await fetch(`http://localhost:${PORT}/user/signup`, {
             method : "POST",
             headers : {
                "Content-Type" : "application/json"
             },
             body : JSON.stringify({
                username : "",
                email : "tanmay01.ola@gmail.com",
                 password : "tanmay"
             })
        })
         body = await response.json() as Body;
        expect(body.message).toBe("Too small: expected string to have >=3 characters");
        expect(response.status).toBe(400);
       
     })
     
     test ("CHECK SMALL PASSWORD" , async()=>{
          const response = await fetch(`http://localhost:${PORT}/user/signup` , {
            method  : "POST",
            headers : {
                "Content-Type" : "application/json"
                        },
           body : JSON.stringify({
             username : "dkjgdffdg",
             password : "fdd",
             email : "dgjkdf@gmail.com"
           })
          })
           body = await response.json() as Body;
          expect(body.message).toBe("Too small: expected string to have >=6 characters");
          expect(response.status).toBe(400)
      
     })

     test("CHECK USERNAME MISSING" , async()=>{
        const response = await fetch(`http://localhost:${PORT}/user/signup` , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email : "tanmay01@gmail.com",
                password : "Tanmay234"
            })
        })
         body = await response.json() as Body;
        expect(body.message).toBe( "Invalid input: expected string, received undefined")
        expect(response.status).toBe(400);
     
     })
     test("EMAIL EMPTY" , async()=>{
        const response = await fetch(`http://localhost:${PORT}/user/signup` , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : "tanmay",
                email : "",
                password : "tanmaysf"
            })
        })
        body = await response.json() as Body;
        expect(body.message).toBe("Invalid email address");
        expect(response.status).toBe(400)
     })
   test("CHECK EMAIL MISSING" , async()=>{
    const response = await fetch(`http://localhost:${PORT}/user/signup` , {
        method : "POST",
        headers : {
           "Content-Type" : "application/json"   
        },
        body : JSON.stringify({
            username : "tanmy",
            password : "tanmat123"
        })
    })
      body =await response.json() as Body;
    expect(body.message).toBe("Invalid input: expected string, received undefined")
    expect(response.status).toBe(400);
   })

   test("CHECK PASSWORD MISSING" , async()=>{
    const response = await fetch(`http://localhost:${PORT}/user/signup` , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            username : "Tanmy",
            email : "Tanmat12345@gmail.com"
        })
    })
    body = await response.json() as Body;
    expect(body.message).toBe("Invalid input: expected string, received undefined");
    expect(response.status).toBe(400);
   })

   afterEach(async()=>{
      console.log("ID-" , id)
      id = body.id
       if(!(id === undefined)){
          await prisma.user.delete({
            where : {
                id : id
            }
          })
       }
   })


