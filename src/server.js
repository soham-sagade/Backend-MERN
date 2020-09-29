const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const route = require('./routes');
const routes = require('./routes');
const http = require('http');
const socketio = require('socket.io');
const PORT = process.env.PORT || 8111;
const path = require("path");

const { Socket } = require('dgram');
const server = http.Server(app);
const io = socketio(server);




app.get('/status',(req,res) =>{
    res.send("HEllo there");
})
if(process.env.NODE_ENV != 'production')
{
    require('dotenv').config();
}


try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    
    console.log("mongodb connected");
} catch (error) {
    console.log("error");
}

const connectUsers = {};


io.on('connection',socket =>{
    
    const {user} = socket.handshake.query;

    connectUsers[user] = socket.id;

})

//app.use();
app.use((req,res,next) => {
    req.io = io;
    req.connectUsers = connectUsers;
    return next();
})
app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/files",express.static(path.resolve(__dirname,"..","files")));

server.listen(PORT, () =>{
    console.log(`listening on ${PORT}`);
} )



