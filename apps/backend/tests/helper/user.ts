import { prisma } from "db/client";
import bcrypt from "bcrypt";
export async function CreateUser(){
    const defaultData = {
        username : "tanmayad",
        email : "tanmayfds@gmail.com",
        password : "tanmay"
    }
 const hashedPassword = await bcrypt.hash(defaultData.password , 10)
    const createUser = await prisma.user.create({
        data : {
            username : defaultData.username,
            password : hashedPassword,
            email : defaultData.email
        }
    })
}