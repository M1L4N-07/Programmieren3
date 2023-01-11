class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y)
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