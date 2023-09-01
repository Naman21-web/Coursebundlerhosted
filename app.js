import express from "express";
import {config} from "dotenv";
import course from "./routes/courseRoutes.js"
import user from "./routes/userRoutes.js"
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import payment from "./routes/paymentRoutes.js"
import other from "./routes/otherRoutes.js";
import cors from "cors"
import path from 'path'

config({
    path:"./config/config.env"
})
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended:true,
    })
)

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname,'build')));
// app.get('*',(req,res) =>{
//   // console.log(path.resolve(__dirname,"..","coursebundler","build","index.html"))
//   res.sendFile(path.join(__dirname,'build','index.html'));
// })

app.use(cookieParser());

app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

app.use("/api/v1",course);
app.use("/api/v1",user);
app.use("/api/v1",payment);
app.use("/api/v1",other);


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,'build')));
app.get('*',(req,res) =>{
  // console.log(path.resolve(__dirname,"..","coursebundler","build","index.html"))
  res.sendFile(path.join(__dirname,'build','index.html'));
})

export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

app.use(ErrorMiddleware);