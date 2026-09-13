
import {afterAll, beforeAll, expect, test} from "bun:test";
import { app } from ".";
import {createServer, Server} from "node:http";
import { email } from "zod";
import { ja } from "zod/locales";
let server : Server ; 
let PORT : number;
beforeAll(async()=>{
     server = createServer(app);
     await new Promise<void>((resolve)=>{
             server.listen(0);
             server.on("listening" , ()=>{
                resolve()
             })
     })
    const address = server.address();
     PORT = address!.port;
})


test("CHECK SIGNUP ENDPOINT", async()=>{
     const response = await fetch(`http://localhost:${PORT}/user/signup` , {
        method : "POST",
        headers  : {
                   "Content-Type": "application/json"
        },
        body : JSON.stringify({
            username : "tamay234",
            email : "tandffjghhgfhfdjghmay@gmail",
            password : "tanmay234"
        })
     })
     const body = await response.json();
     console.log("BODY -" , body)
     expect(body.message).toBe("User signed up");
     expect(response.status).toBe(200);

     })
     test("IF EMAIL CONTAINS .com" ,async()=>{
        const response = await fetch(`http:localhost:${PORT}/user/signup`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : "tanmay",
                email : "tanmay@gmail.com",
                password : "tanmay123"
            })
        })
        const body = await response.json();
        expect(body.message).toBe("Invalid email address");
        expect(response.status).toBe(400)
     })

     test("IF EMAIL CONTAINS @gmail" , async()=>{
        const response = await fetch(`http://localhost:${PORT}/user/signup` , {
            method : "POST",
            headers : {
                "Content-Type" :"application/json"
            },
            body : JSON.stringify({
                username : "Tanmay",
                email : "tanmay@gmail"
            })
        })
     })
     test("USERNAME EMPTY" , async()=>{
        const response = await fetch(`http:localhost:${PORT}/user/signup`, {
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
        const body = await response.json();
        expect(body.message).toBe( "Invalid input: expected string, received undefined")
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
    const body =await response.json();
    expect(body.message).toBe("Invalid input: expected string, received undefined")
    expect(response.status).toBe(400)
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
    const body = await response.json();
    expect(body.message).toBe("Invalid input: expected string, received undefined");
    expect(response.status).toBe(400)
   })
afterAll(()=>{
   server.close()
})
