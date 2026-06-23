import express from 'express';
import dotenv from 'dotenv';
import productRouter from './routes/product.js'
import { connectDB } from './lib/db.js';
import cors from 'cors';
dotenv.config({});

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173","https://cursor-pagination-phi.vercel.app"],
  credentials: true
}))


app.use("/", productRouter)
app.get("/health",(req,res)=>{
  return res.status(200).json({
    status : "ok"
  })
})
const port = process.env.PORT || 8000;

await connectDB()
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
})


