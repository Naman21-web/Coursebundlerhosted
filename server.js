
import app from "./app.js";
import { connectDb } from "./config/database.js";
import cloudinary from "cloudinary";
import RazorPay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";

connectDb();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CIENT_API,
    api_secret:process.env.CLODINARY_CLIENT_SECRET
});

export const instance = new RazorPay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

nodeCron.schedule("0 0 0 1 * *",async ()=>{
    try{
        await Stats.create({});
    }catch(error){
        console.log(error);
    }
})

await Stats.create({});

app.listen(process.env.PORT,()=>{
    console.log(`Server working on Port: ${process.env.PORT}`);
})