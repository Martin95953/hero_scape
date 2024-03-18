import {ref} from 'vue'
import {hero_service} from "@/services/HeroService"
import {enemy_service} from "@/services/EnemyService"
import {AStar} from "@/utils/AStar"

class BoardService {

    board = ref([])

    ACCEPTED_WALK = [0]
    ACCEPTED_FREE_POSITION = [0]

    constructor() {
        this.board.value = this.generateRandomMap()
        this.board.value[this.generateRandomPosition().row][this.generateRandomPosition().col] = hero_service.getCharacter()
        this.board.value[this.generateRandomPosition().row][this.generateRandomPosition().col] = enemy_service.getCharacter()
        this.generateRandomObstacles()
    }

    generateRandomMap() {
        let map = []
        const size = Math.floor(Math.random() * 20) + 5

        for (let i = 0; i < size; i++) {
            let row = []
            for (let j = 0; j < size; j++) {
                row.push(this.ACCEPTED_WALK[Math.floor(Math.random() * this.ACCEPTED_WALK.length)])
            }
            map.push(row)
        }

        return map
    }

    generateRandomObstacles() {
        for (let i = 0; i < this.getBoard().length-1; i++) {
            let position = this.generateRandomPosition()
            this.getBoard()[position.row][position.col] = 1
        }
    }

    generateRandomPosition() {
        let row = Math.floor(Math.random() * this.getBoard().length)
        let col = Math.floor(Math.random() * this.getBoard().length)
        console.log("row", row)
        console.log("col", col)
        console.log(this.getBoard()[row][col])
        if(this.ACCEPTED_FREE_POSITION.includes(this.getBoard()[row][col])) {
            return {row, col}
        }else{
            return this.generateRandomPosition(this.getBoard())
        }
    }
    getBoard() {
        return this.board.value
    }

    getWayBetweenTwoPoints(start,end) {

        let aStar = new AStar(this.getBoard())

        return aStar.findPath(start,end)
    }

    restartGame() {
        window.location.reload()
    }

    setPosition(row, col, value) {
        this.board.value[row][col] = value
    }
    validateFreePosition(x, y) {
        return  this.ACCEPTED_FREE_POSITION.includes(this.board.value[x][y]) &&
                this.board.value[x][y] !== hero_service.getCharacter() &&
                this.board.value[x][y] !== enemy_service.getCharacter()
    }
}

export const board_service = new BoardService()