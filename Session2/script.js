let matrix = [
    [1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 2, 0],
    [0, 0, 0, 0, 0]
]

let side = 50

let grassArr     = []
let grazerArr    = []
let carnivoreArr = []
let toadstoolArr = []

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

function setup() {
    matrix = randMartix(15,10)
    frameRate(1)
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1)
    background("white")
    
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
            } else if (wert == 4) {
                let toadstool = new Toadstool(x, y)
                toadstoolArr.push(toadstool)
            }
        }
    }

    // console.log("\n________________________________________________________________________________")
    // console.log("\n")
    //console.log(grazerArr)
    //console.log(carnivoreArr)
    console.log(toadstoolArr)
}

function draw() {
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
    for (let i in toadstoolArr) {
        let todstlObj = toadstoolArr[i]
        todstlObj.eat()
    }
}