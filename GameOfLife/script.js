let side       = 10
let matrixSize = 500

function main() {
    const socket = io()

    socket.on("send matrix", drawMatrix)
    function randMartix(x, y) {
        let matrix = []
        for (let i = 0; i < y; i++) {
            matrix[i] = []
            for (let j = 0; j < x; j++) {
                matrix[i][j] = Math.round(Math.random())
            }
        }
    
        matrix[2][3] = 2
        matrix[5][7] = 2
        matrix[3][7] = 2
        matrix[3][3] = 3
        matrix[6][4] = 3
        matrix[5][3] = 4
        return matrix
    }
}

function setup() {
    createCanvas(matrixSize * side + 1, matrixSize * side + 1)
    background("white")
}

function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill("grey")
            if (matrix[y][x] == 0) {
                fill("lightgrey")
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
            textSize(12)
            text(x + "/" + y, x * side + side/2, y * side + side/2)
        }
    }
}

window.onload = main
