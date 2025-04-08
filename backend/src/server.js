import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/Database.js';
import  cors from 'cors'

import menuRoute from './routers/menuRoute.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.FRONTEND_CONNECTION,
  credentials:true
}))
app.use(express.json());
app.use(express(urlencoded({extends:true})));

app.use('/',menuRoute);

connectDB();
app.listen(PORT,()=>{
  console.log(`server run at localhost : ${PORT}`)
})