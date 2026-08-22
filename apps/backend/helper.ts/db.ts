import z from "zod"
export const signupBody = z.object({
    username : z.string(),
    password : z.string(),
    email : z.string().email()
})

export const signinBody= z.object({
    email : z.string().email(),
    password : z.string(
        
    )
})

export const OrgBody = z.object({
    name : z.string()
})


export const boardBody = z.object({
    name : z.string()
})

export const issueBody = z.object({
    title : z.string(),
    description : z.string().optional(),
    status : z.enum(["done" , "in_progress" ,"upcoming"])
})