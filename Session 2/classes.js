class Grass {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell() {
        let found = []

        for (let i in this.directions) {
            let posCellArr = this.directions[i]
            let x = posCellArr[0]
            let y = posCellArr[1]

            if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length) {
                if (matrix[y][x] == 0) {
                    found.push(posCellArr)
                }
            }
        }
        return found
    }

    mul() {
        this.multiply++
        if (this.multiply >= 6) {
            let emptyCells = this.chooseCell()
            // console.log(emptyCells)
            let theChosenField = random(emptyCells)
            // console.log("GewÃ¤hltes Nachbarfeld:", theChosenField)
            if (theChosenField) {
                let newGrassObj = new Grass(theChosenField[0], theChosenField[1])
                // console.log("neues gras objekt", newGrassObj)
                grassArr.push(newGrassObj)
                matrix[theChosenField[1]][theChosenField[0]] = 1
            }
            this.multiply = 0
        }
    }
}

class Grazer {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = []
        this.energy = 10
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(symbol) {
        this.getNewCoordinates()
        
        let found = []

        for (let i in this.directions) {
            let posCellArr = this.directions[i]
            let x = posCellArr[0]
            let y = posCellArr[1]

            if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length) {
                if (matrix[y][x] == symbol) {
                    found.push(posCellArr)
                }
            }
        }
        return found
    }

    move() {
        let emptyCells = this.chooseCell(0)
        if (this.energy > 0){
            if (emptyCells.length !== 0) {
                let theChosenField = random(emptyCells)
                
                let newX = theChosenField[0]
                let newY = theChosenField[1]

                matrix[newY][newX] = 2
                matrix[this.y][this.x] = 0

                this.x = newX
                this.y = newY

                this.energy--
            }
        } else if (this.energy <= 0) {
            this.die()
        }
    }

    die() {
        matrix[this.y][this.x] = 0

        for (let i in grazerArr) {
            let grzObj = grazerArr[i]
            if (grzObj.x === this.x && grzObj.y === this.y) {
                grazerArr.splice(i, 1);
                break;
            }
        }
    }

    eat() {
        let grassCells = this.chooseCell(1)
        if (grassCells.length !== 0) {
            let theChosenField = random(grassCells)
                
            let newX = theChosenField[0]
            let newY = theChosenField[1]

            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

            for (let i in grassArr) {
                let grassObj = grassArr[i]
                if (grassObj.x === newX && grassObj.y === newY) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.energy++;
            this.multiply++
        } else {
            this.move()
            this.multiply = 0
        }
    }

    mul() {
        if (this.multiply >= 6) {
            let emptyCells = this.chooseCell(0)
            let theChosenField = random(emptyCells)
            if (theChosenField) {
                let newGrazerObj = new Grazer(theChosenField[0], theChosenField[1])
                grazerArr.push(newGrazerObj)
                matrix[theChosenField[1]][theChosenField[0]] = 2
            }
            this.multiply = 0
        }
    }
}

class Carnivores {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = []
        this.energy = 10
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(symbol) {
        this.getNewCoordinates()
        
        let found = []

        for (let i in this.directions) {
            let posCellArr = this.directions[i]
            let x = posCellArr[0]
            let y = posCellArr[1]

            if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length) {
                if (matrix[y][x] == symbol) {
                    found.push(posCellArr)
                }
            }
        }
        return found
    }

    move() {
        let emptyCells = this.chooseCell(0)
        if (this.energy > 0){
            if (emptyCells.length !== 0) {
                let theChosenField = random(emptyCells)
                
                let newX = theChosenField[0]
                let newY = theChosenField[1]

                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 0

                this.x = newX
                this.y = newY

                this.energy--
            }
        } else if (this.energy <= 0) {
            this.die()
        }
    }

    die() {
        matrix[this.y][this.x] = 0

        for (let i in carnivoreArr) {
            let carnObj = carnivoreArr[i]
            if (carnObj.x === this.x && carnObj.y === this.y) {
                carnivoreArr.splice(i, 1);
                break;
            }
        }
    }

    eat() {
        let grazerCells = this.chooseCell(2)
        if (grazerCells.length !== 0) {
            let theChosenField = random(grazerCells)
                
            let newX = theChosenField[0]
            let newY = theChosenField[1]

            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

            for (let i in grazerArr) {
                let grazerObj = grazerArr[i]
                if (grazerObj.x === newX && grazerObj.y === newY) {
                    grazerArr.splice(i, 1);
                    break;
                }
            }
            this.energy++;
            this.multiply++
        } else {
            this.move()
            this.multiply = 0
        }
    }

    mul() {
        if (this.multiply >= 6) {
            let emptyCells = this.chooseCell(0)
            let theChosenField = random(emptyCells)
            if (theChosenField) {
                let newCarnivoresObj = new Carnivores(theChosenField[0], theChosenField[1])
                carnivoreArr.push(newCarnivoresObj)
                matrix[theChosenField[1]][theChosenField[0]] = 3
            }
            this.multiply = 0
        }
    }
}

class Toadstool {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell() {
        let found = []

        for (let i in this.directions) {
            let posCellArr = this.directions[i]
            let x = posCellArr[0]
            let y = posCellArr[1]

            if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length) {
                found.push(posCellArr)
            }
        }
        return found
    }

    eat() {
        let cells = this.chooseCell()
        for(let i in cells) {
            matrix[cells[i][1]][cells[i][0]] = 0
        }
    }
}