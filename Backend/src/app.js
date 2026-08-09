import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import{connectToSocket} from "./controllers/socketManager.js"
import userRoutes from "./routes/users.routes.js"

const app=express();
const server=createServer(app);
const io= connectToSocket(server);

app.set("port",(process.env.PORT||8080))

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({ limit: "40kb", extended:true }));
app.use("/api/v1/users",userRoutes)

const start=async()=>{
    const connectionDB = await mongoose.connect(
<<<<<<< HEAD
        "mongodb+srv://shradhachoudhary04_db_user:2pRUs4LiC6KgebK3@cluster0.igwvovg.mongodb.net/?appName=Cluster0",
=======
      "mongodb+srv://shradhachoudhary04_db_user:2pRUs4LiC6KgebK3@cluster0.igwvovg.mongodb.net/?appName=Cluster0",
>>>>>>> 181a8c4 (Deploying Frontend)
    );
    console.log(`MONGO Connectd DB Host: ${connectionDB.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("listening on 8080");
    });
}

start();
