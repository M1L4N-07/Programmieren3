class Grazer extends LivingCreature {
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