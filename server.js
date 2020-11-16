const http = require("http")
const path = require("path")

const express = require("express")
const socketio = require("socket.io")

const app = express()
const server = http.Server(app)
const io = socketio(server)

const staticDir = path.join(__dirname, "src", "static")
const PORT = process.env.PORT || 5000

// TODO: pensar em maneira melhor de gerenciar os clientes
let connectedClients = []

app.use(express.static(staticDir))

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "./src/pages" })
})

io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.conn.id}`)
    connectedClients.push(socket)
    io.emit("message", "say hi")

    socket.on("new-message", (message) => sendToEveryoneElse(message, socket))
    socket.on("disconnect", _ => removeClient(socket))
})

server.listen(PORT, () => {
    console.clear()
    console.log(`Listening on localhost:${PORT}`)
})


const id = socket => socket.conn.id

const removeClient = socket => {
    const isDisconnetedClient = skt => id(skt) === id(socket)
    connectedClients = connectedClients.filter(isDisconnetedClient)
    console.log(`Client disconnected: ${socket.id}`)
}

const sendToEveryoneElse = (message, senderConnection) => {
    connectedClients.forEach(client => {
        if (client.id === senderConnection.id)
            return
        client.emit("new-message", message)
    })
}
