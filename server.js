const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)


var numUsers = 0

app.use(express.static(__dirname + "/"))

app.get("/", (req, res) => {
    res.sendFile("index.html")
})

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {

        console.log("message: " + msg)
        socket.broadcast.emit("chat message", {
            msg,
            username: socket.username
        })
    })
    socket.on("typing", (username) => {


        socket.broadcast.emit("typing", {
            nickname: username,

        })
    })
    socket.on('disconnect', () => {
        if (numUsers > 0)
            numUsers--;

        io.emit("disconnected", {
            numUsers,
            username: socket.username
        })
    });
    socket.on("add user", (username) => {
            console.log(username)
            socket.username = username;
            numUsers++
            socket.emit("login", {
                numUsers: numUsers
            })
            socket.broadcast.emit("user joined", {
                numUsers,
                username: socket.username
            })
        })
        //console.log(socket)
    io.emit("connected", "user connected")

})

http.listen(3000, () => {
    console.log("listening to port 3000")
})