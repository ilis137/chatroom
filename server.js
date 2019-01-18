const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)


app.use(express.static(__dirname + "/"))

app.get("/", (req, res) => {
    res.sendFile("index.html")
})

io.on("connection", (socket) => {
    console.log("a user connected")
})

http.listen(3000, () => {
    console.log("listening to port 3000")
})