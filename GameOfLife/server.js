const Grass      = require("./grass.js")
const Grazer     = require("./grazer.js")
const Carnivores = require("./carnivores.js")
//const Toadstool  = require("./toadstool.js")
const express = require("express")
const app = express()

matrix = [
    [1, 1, 1, 1, 0],
    [1, 1, 2, 2, 0],
    [1, 1, 0, 0, 0],
    [2, 0, 2, 3, 0],
    [0, 0, 0, 4, 0],
    [0, 3, 3, 0, 3],
    [0, 0, 0, 4, 0]
]

grassArr     = []
grazerArr    = []
carnivoreArr = []
//toadstoolArr = []


function initGame() {
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            let wert = matrix[y][x]
            if(wert == 1){
                let grass = new Grass(x, y)
                // console.log(grass)
                grassArr.push(grass)
            } else if (wert == 2) {
                let grazer = new Grazer(x, y)
                grazerArr.push(grazer)
            } else if (wert == 3) {
                let carnivore = new Carnivores(x, y)
                carnivoreArr.push(carnivore)
            }/* else if (wert == 4) {
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

    console.log(matrix)
}

initGame()
setInterval(() => {
    updateGame()
}, 500);
updateGame()

app.listen(3000, function () {
    console.log("Server läuft auf Port 3000...")
})