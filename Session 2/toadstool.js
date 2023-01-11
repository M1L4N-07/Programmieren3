class Toadstool extends LivingCreature {
    constructor(x, y) {
        super()
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