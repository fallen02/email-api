import express,  { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { SendEmails, SendOnlyEmails } from './helpers';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(express.json())
app.use(cors())

app.post('/send',  (req: Request, res: Response) => {
  const reqData =  req.body
  const response = SendEmails(reqData)
  res.send(response)
})

app.post('/send-email',  (req: Request, res: Response) => {
  const reqData =  req.body
  const response = SendOnlyEmails(reqData)
  res.send(response)
 })
 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
