import { prisma } from "db/client";
import bcrypt from "bcrypt";
export  const password = "tanmygdfjkg124"
 const hashedPassword = await bcrypt.hash(password , 10)
 export let testUserId : string
 export let email : string

export async function CreateUser(){
   return   await prisma.user.create({
        data : {
            username : `test_${crypto.randomUUID()}`,
            email : `test_${crypto.randomUUID()}`,
            password : hashedPassword
        }
    })

}
