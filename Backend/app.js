import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {createServer} from 'node:http'; // used to create a server for socket.io
 import {Server} from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import connectToSocket from './controllers/socketManager.js';
import userRoutes from "./routes/user.routes.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);
app.set("port", (process.env.PORT || 5000));
app.use(cors({
    origin: "http://localhost:5173", // Aapke Vite frontend ka URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));




app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));


app.use("/api/v1/users",userRoutes);
//app.use("/api/v2/users", newUserRoutes);

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

;app.get("/home",(req,res)=>{
    return res.json({message:"Welcome to the home page"});
})

const start = async()=>{
     try {
        const connectionDb = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB: ${connectionDb.connection.host}`);
    } catch (err) {
        console.error(' MongoDB connection failed:', err.message);
        console.log(' Server starting WITHOUT database');
    }
    server.listen(app.get("port"),()=>{
        console.log("Server is running on port 5000");
    });
}

start();