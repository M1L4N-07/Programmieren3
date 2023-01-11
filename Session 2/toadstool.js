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

    eat() {
        let cells = this.chooseCell()
        for(let i in cells) {
            matrix[cells[i][1]][cells[i][0]] = 0
        }
    }
}