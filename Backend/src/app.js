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
      "mongodb+srv://chyshradha_db_user:chy.shr@cluster0.b6klqgs.mongodb.net/",
    );
    console.log(`MONGO Connectd DB Host: ${connectionDB.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("listening on 8080");
    });
}

start();