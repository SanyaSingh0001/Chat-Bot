import {Server} from "socket.io";
const connectToSocket = (server)=>{
    const io = new Server(server , {
        cors: {
            origin: "http://localhost:5173", // Aapke Vite frontend ka URL
            methods: ["GET", "POST"],
            credentials: true
        }
     }
    );

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Authentication error: Token missing!"));
    }
    // Yahan aap JWT verify bhi kar sakte hain (jwt.verify)
    next(); 
});

io.on("connection",(socket)=>{
    console.log('a user connected:' ,socket.id);
    socket.on("message",(message)=>{
        console.log("Received message from client:", message);
        io.emit("message", message);
    });
//socket.on('disconnect', () => {
    //console.log('user disconnected');
 // });

});
return io;
};
export default connectToSocket;