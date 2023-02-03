let side       = 10
let matrixSize = 50

function main() {
    const socket = io()

    socket.on("send matrix", drawMatrix)
    
    let myNewGameButton = document.getElementById("newGame");
    myNewGameButton.addEventListener("click", newGameHandler);
    function newGameHandler(){
        console.log("neues Spiel");
        socket.emit("newGame", 25);
    }
}

function setup() {
    createCanvas(matrixSize * side + 1, matrixSize * side + 1)
    background("white")
}

function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill("white")
            if (matrix[y][x] == 0) {
                fill("white")
            } else if (matrix[y][x] == 1) {
                fill("green")
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
