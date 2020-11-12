const http = require("http")
const path = require("path")

const cors = require("cors")
const express = require("express")
const socketio = require("socket.io")

const app = express()
const server = http.Server(app)
const io = socketio(http)

const staticDir = path.join(__dirname, "src", "static")

app.use(express.static(staticDir))
// app.use(cors({
//     credentials: true,
//     origin: ["http://localhost:3000"]
// }))

app.get("/chat", (req, res) => {
    res.sendFile("index.html", { root: "./src/pages" })
})

io.on("connection", (socket) => {
    console.log("New user connected!")
})

server.listen(3000, () => {
    console.clear()
    console.log("Listening on localhost:3000")
})
