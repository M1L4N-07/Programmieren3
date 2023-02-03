let side       = 10
let matrixSize = 50
let localIsRaining = false
const socket = io()

function main() {

    socket.on("send matrix", drawMatrix)
    socket.on("isRaining", rainHandler)

    function rainHandler(inputIsRaining) {
        console.log("is raining...")
        localIsRaining = inputIsRaining
    }

    let myNewGameButton = document.getElementById("newGame");
    myNewGameButton.addEventListener("click", newGameHandler);
    function newGameHandler(){
        console.log("new Game...");
        socket.emit("newGame", 25);
    }

    let KillAllGrassButton = document.getElementById("killAllGrass")
    KillAllGrassButton.addEventListener("click", killAllGrassHandler)
    function killAllGrassHandler() {
        console.log("kill all grass")
        socket.emit("killAllGrass")
    }
}

function setup() {
    createCanvas(matrixSize * side + 1, matrixSize * side + 1)
    background("white")
}

function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill("lightgrey")
            if (matrix[y][x] == 0) {
                fill("white")
            } else if (matrix[y][x] == 1) {
                fill("green")
                if (localIsRaining == true) {
                    fill("darkgreen")
                }
            } else if (matrix[y][x] == 2) {
                fill("yellow")
            } else if (matrix[y][x] == 3) {
                fill("red")
            } else if (matrix[y][x] == 4) {
                fill("pink")
            }
            rect(x * side, y * side, side, side)

            fill("black")
        }
    }
}

window.onload = main
