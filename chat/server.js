const express = require("express")
const app = express()
let httpServer = require("http").Server(app)

let {Server} = require("socket.io")
const io = new Server(httpServer)




app.use(express.static("./"))

app.get("/", function (req, res) {
    res.redirect("index.html")
})

httpServer.listen(3000, function () {
    console.log("Server läuft auf Port 3000...")
})

