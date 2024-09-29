import express,  { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import cors from 'cors';


dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY as string);
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(express.json())
app.use(cors())

app.post('/send', async (req: Request, res: Response) => {
 try {
  const reqData = await req.body

  const text = `Name: ${reqData.name}\nEmail: ${reqData.email}\nMessage: ${reqData.message}`
  const html = `<p>Name: ${reqData.name}</p><p>Email: ${reqData.email}</p><p>Message: ${reqData.message}</p>`

  const {data, error} = await resend.emails.send({
    from: 'admin@fallen02.xyz',
    to: ['000.sb13@gmail.com'],
    subject: 'Hello World',
    text: text,
    html: html
  })

  if(error) return res.status(400).json({message: "Something Went Wrong"})
  return res.status(200).json({message: "Success"})
 } catch (error) {
  return res.status(500).json({ message: 'Internal Server Error' });
 }
})

app.post('/send-email', async (req: Request, res: Response) => {
  try {
   const reqData = await req.body

   const text = `Email: ${reqData.email}\n`
   const html = `<p>Email: ${reqData.email}</p>`
 
   const {data, error} = await resend.emails.send({
     from: 'admin@fallen02.xyz',
     to: ['000.sb13@gmail.com'],
     subject: 'New Email',
     text: text,
     html: html
   })
 
   if(error) return res.status(400).json({message: "Something Went Wrong"})
   return res.status(200).json({message: "Success"})
  } catch (error) {
   return res.status(500).json({ message: 'Internal Server Error' });
  }
 })
 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
