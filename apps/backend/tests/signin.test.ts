import {expect, test} from "bun:test";
import { PORT } from "./setup";
import { password, type Body } from "./setup";

test("CHECK_SIGNIN" , async()=>{
    console.log("PASSOWRD" , password)
   const response = await fetch(`http://localhost:${PORT}/user/signin` , {
    method : "POST",
    headers : {
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({
        email : "cvbv@gmail.com",
        password : password
    })
   })
   const body = await response.json() as Body;
   expect(body.message).toBe("USER_LOGGED_IN");
   expect(response.status).toBe(200)
})
test("EMAIL FIELD EMPTY" , async()=>{
    const response = await fetch(`http://localhost:${PORT}/user/signin` , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            email : "",
            password : password
        })
    })
    const body = await response.json() as Body;
    expect(body.message).toBe("bad inputs");
    expect(response.status).toBe(400);
})

  test("EMAIL MISSING", async()=>{
    const response = await fetch(`http://localhost:${PORT}/user/signin` , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        } ,
        body : JSON.stringify({
            password : "gdfjklfgjdf"
        })
    })
    const body = await response.json() as Body;
    expect(body.message).toBe("bad inputs");
    expect(response.status).toBe(400);
  })



  test("PASSWORD MISSING" ,async()=>{
    const response = await fetch(`http://localhost:${PORT}/user/signin` , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            email : "cvbv@gmail.com",
        })

    })
    const body = await response.json() as Body;
    expect(body.message).toBe("bad inputs");
    expect(response.status).toBe(400)
  })


  test("EMAIL NOT SIGNED UP" , async()=>{
     const response = await fetch(`http://localhost:${PORT}/user/signin` , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        } ,
        body : JSON.stringify({
            email : "tanmdfhsgjay@gmail.com",
            password : password
        })
     })
     const body = await response.json() as Body;
     expect(body.message).toBe("EMAIL_NOT_SIGNED_UP");
     expect(response.status).toBe(400)
  })

  test("INCORRECT PASSWORD" , async()=>{
    const response = await fetch(`http://localhost:${PORT}/user/signin` , {
        method : "POST",
        headers : {
            'Content-Type' : "application/json"
        },
        body : JSON.stringify({
                   email : "cvbv@gmail.com",
            password : "sdfljksadfj"
        })
    })
    const body = await response.json() as Body;
    console.log("BODY", body)
    expect(body.message).toBe("INCORRECT_PASSWORD");
    expect(response.status).toBe(401)
  })


