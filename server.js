const path = require("path")
const express = require("express")

const app = express()

const staticDir = path.join(__dirname, "src", "static")

app.use(express.static(staticDir))

app.get("/chat", (req, res) => {
    res.sendFile("index.html", { root: "./src/pages" })
})

app.listen(3000, () => {
    console.log("Listening")
})
