const http = require("http")
const path = require("path")

const express = require("express")
const socketio = require("socket.io")

const app = express()
const server = http.Server(app)
const io = socketio(server)

const staticDir = path.join(__dirname, "src", "static")

app.use(express.static(staticDir))

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "./src/pages" })
})

io.on("connection", (socket) => {
    socket.emit("message", "say hi")
})

server.listen(3000, () => {
    console.clear()
    console.log("Listening on localhost:3000")
})
