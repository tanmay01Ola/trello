import { prisma } from "db/client";
import { CreateUser } from "./createUser";
const testUser = CreateUser();
import type { TestUser } from "../signin.test";
export async function DeleteUser(){
    await prisma.user.delete({
        where : {
            id : (await testUser).id
        }
    })
}