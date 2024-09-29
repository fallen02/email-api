import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY as string);
export const SendEmails = async (reqData: any ) => {
    try {
        const text = `Name: ${reqData.name}\nEmail: ${reqData.email}\nMessage: ${reqData.message}`
        const html = `<p>Name: ${reqData.name}</p><p>Email: ${reqData.email}</p><p>Message: ${reqData.message}</p>`
        const { data, error } = await resend.emails.send({
            from: 'admin@fallen02.xyz',
            to: ['000.sb13@gmail.com'],
            subject: 'New Email from MyPromo',
            text: text,
            html: html
        })
        if (error) return { message: "Something Went Wrong" }
        return { message: "Success" }
    } catch (error) {
        return { message: 'Internal Server Error' }
    }
}

export const SendOnlyEmails = async (reqData: any ) => {
    try {
        const text = `Email: ${reqData.email}\n`
        const html = `<p>Email: ${reqData.email}</p>`
        const { data, error } = await resend.emails.send({
            from: 'admin@fallen02.xyz',
            to: ['000.sb13@gmail.com'],
            subject: 'New Email',
            text: text,
            html: html
        })
        if (error) return ({ message: "Something Went Wrong" })
        return ({ message: "Success" })
    } catch (error) {
        return ({ message: 'Internal Server Error' })
    }
}