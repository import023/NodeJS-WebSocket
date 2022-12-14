import http from "http";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req,res) => res.render("home"));
app.get("/*", (req, res) => res.render("home"))

const handleListen = () => console.log(`Listening on http://localhost:3000`)
// app.listen(3000, handleListen);

const httpServer = http.createServer(app)//http server

const wss = new WebSocket.Server({server})
const sockets = []

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anno"
    console.log("사용자와 연결되었습니다.")
    socket.on("close", () => {
        console.log("사용자로부터 연결이 끊겼습니다.")
    })
    socket.on("message", (msg) => {
        const message = JSON.parse(msg)
        switch (message.type){
            case 'new_message':
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname} : ${message.payload}`))
            case 'nickname':
                socket["nickname"] = message.payload
        }
    
    })
})


httpServer.listen(3000, handleListen);


