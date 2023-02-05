let side = 10
let matrixSize = 50
localIsRaining = false
const socket = io()

function main() {

    socket.on("send matrix", drawMatrix)
    socket.on("isRaining", (inputIsRaining) => {
        console.log("is raining: " + inputIsRaining)
        localIsRaining = inputIsRaining
    })

    let myNewGameButton = document.getElementById("newGame");
    myNewGameButton.addEventListener("click", newGameHandler);
    function newGameHandler() {
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
    background("darkgrey")
}

function drawMatrix(matrix) {
    console.log("drawing matrix...")
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill("lightgrey")
            if (matrix[y][x] == 0) {
                fill("white")
            } else if (matrix[y][x] == 1) {
                if (localIsRaining == true) {
                    fill("forestgreen")
                } else {
                    fill("lawngreen")
                }
            } else if (matrix[y][x] == 2) {
                if (localIsRaining == true) {
                    fill("goldenrod")
                } else {
                    fill("gold")
                }
            } else if (matrix[y][x] == 3) {
                if (localIsRaining == true) {
                    fill("darkred")
                } else {
                    fill("red")
                }
            } else if (matrix[y][x] == 4) {
                if (localIsRaining == true) {
                    fill("hotpink")
                } else {
                    fill("pink")
                }
            }
            rect(x * side, y * side, side, side)

            fill("black")
        }
    }
}

window.onload = main
