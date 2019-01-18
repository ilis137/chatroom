const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)


app.use(express.static(__dirname + "/"))

app.get("/", (req, res) => {
    res.sendFile("index.html")
})

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        console.log("message: " + msg)
        io.emit("chat message", msg)
    })
    socket.on('disconnect', function() {
        io.emit("disconnected", "user disconnected")
    });

    io.emit("connected", "user connected")

})

http.listen(3000, () => {
    console.log("listening to port 3000")
})