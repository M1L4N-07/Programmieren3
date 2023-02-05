isRaining = false

const Grass = require("./grass.js")
const Grazer = require("./grazer.js")
const Carnivores = require("./carnivores.js")
//const Toadstool  = require("./toadstool.js")

const express = require("express")
const app = express()

let httpServer = require("http").Server(app)
let { Server } = require("socket.io")
const { kill } = require("process")
const io = new Server(httpServer)

app.use(express.static("./"))

app.get("./", function (req, res) {
    res.redirect("index.html")
})

matrix = randMatrix(50, 50)

grassArr = []
grazerArr = []
carnivoreArr = []
//toadstoolArr = []

function randMatrix(x, y) {
    let matrix = []
    const values = [1, 2, 3, 0, 0, 0]
    const prob3 = 1 / 5
    const prob4 = 0//1 / 30

    for (let i = 0; i < y; i++) {
        matrix[i] = []
        for (let j = 0; j < x; j++) {
            let randInt = Math.floor(Math.random() * 6)
            switch (randInt) {
                case 0:
                    matrix[i][j] = values[randInt]
                    break
                case 1:
                    matrix[i][j] = values[randInt]
                    break
                case 2:
                    matrix[i][j] = values[randInt]
                    break
                case 3:
                    matrix[i][j] = Math.random() < prob3 ? 3 : 0
                    break
                case 4:
                    matrix[i][j] = Math.random() < prob4 ? 4 : 0
                    break
                default:
                    matrix[i][j] = values[randInt]
                    break
            }
        }
    }
    return matrix
}

function killAllGrass() {
    for (let i = 0; i < grassArr.length; i++) {
        let grassObj = grassArr[i]
        matrix[grassObj.y][grassObj.x] = 0
    }
    grassArr = []
}

function killAllGrazers() {
    for (let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i]
        matrix[grazerObj.y][grazerObj.x] = 0
    }
    grazerArr = []
}

function killAllCarnivores() {
    for (let i = 0; i < carnivoreArr.length; i++) {
        let carnivoreObj = carnivoreArr[i]
        matrix[carnivoreObj.y][carnivoreObj.x] = 0
    }
    carnivoreArr = []
}

/*function killAllToadstools() {
    for (let i = 0; i < toadstoolArr.length; i++) {
        let tdsObj = toadstoolArr[i]
        matrix[tdsObj.y][tdsObj.x] = 0
    }
    toadstoolArr = []
}*/

function newGame() {
    matrix = randMatrix(50, 50)

    grassArr = []
    grazerArr = []
    carnivoreArr = []
    //toadstoolArr = []

    initGame()
}

function initGame() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            let value = matrix[y][x]
            if (value == 1) {
                let grass = new Grass(x, y)
                grassArr.push(grass)
            } else if (value == 2) {
                let grazer = new Grazer(x, y)
                grazerArr.push(grazer)
            } else if (value == 3) {
                let carnivore = new Carnivores(x, y)
                carnivoreArr.push(carnivore)
            }/* else if (value == 4) {
                let toadstool = new Toadstool(x, y)
                toadstoolArr.push(toadstool)
            }*/
        }
    }
}

function updateGame() {
    for (let i in grassArr) {
        let grObj = grassArr[i]
        grObj.mul()
    }
    for (let i in grazerArr) {
        let grzObj = grazerArr[i]
        grzObj.eat()
        grzObj.mul()
    }
    for (let i in carnivoreArr) {
        let carnObj = carnivoreArr[i]
        carnObj.eat()
        carnObj.mul()
    }
    /*for (let i in toadstoolArr) {
        let todstlObj = toadstoolArr[i]
        todstlObj.eat()
    }*/

    console.log("send matrix")
    io.emit("send matrix", matrix)
}

io.on("connection", function (socket) {
    console.log("client ws connection established...")
    io.emit("send matrix", matrix)

    socket.on("killAllGrass", function (data) {
        console.log("client clicked killAllGrass-button...")
    })

    socket.on("newGame", function (data) {
        console.log("client clicked newGame-button")
        newGame()
    })
})

initGame()
setInterval(() => {
    updateGame()
}, 200)
updateGame()

setInterval(function () {
    isRaining = !isRaining
    console.log("isRaining: " + isRaining)
    io.on("connection", (socket) => {
        socket.emit("isRaining", isRaining)
    })
}, 6000)

httpServer.listen(3000, function () {
    console.log("Server läuft auf Port 3000...")
})
