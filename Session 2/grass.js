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