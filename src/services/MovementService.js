import {board_service} from "@/services/BoardService"
import {HeroEntity} from "@/Entities/HeroEntity"
import {EnemyEntity} from "@/Entities/EnemyEntity"
import {enemy_service} from "@/services/EnemyService";

class MovementService {
    CAN_MOVE_IN_BOARD = [HeroEntity.HERO, EnemyEntity.ENEMY]
    WALKABLE_TILES = [0, "H", "E"]
    getPosition(character) {
        let position = {}
        board_service.getBoard().forEach((row, i) => {
            row.forEach((col, j) => {
                if (col === character) {
                    position.row = i
                    position.col = j
                }
            })
        })
        return position
    }
    canMove(character) {
        return this.CAN_MOVE_IN_BOARD.includes(character)
    }
    move(row, col,character) {
        if(!character) return console.error("Character is required")
        let position = this.getPosition(character)
        if(board_service.validateFreePosition(row, col) && this.canMove(character)) {
            let boardValue = board_service.getBoard()
            if (boardValue[position.row] && boardValue[row]) {
                board_service.setPosition(position.row, position.col, 0)
                board_service.setPosition(row, col, character)
            }
        }
    }
    moveUp(character) {
        let position = this.getPosition(character)
        if (position.row > 0) {
            this.move(position.row - 1, position.col,character)
        }
    }
    moveDown(character) {
        let position = this.getPosition(character)
        if (position.row < board_service.getBoard().length - 1) {
            this.move(position.row + 1, position.col,character)
        }
    }
    moveLeft(character) {
        let position = this.getPosition(character)
        if (position.col > 0) {
            this.move(position.row, position.col - 1,character)
        }
    }
    moveRight(character) {
        let position = this.getPosition(character)
        if (position.col < board_service.getBoard().length - 1) {
            this.move(position.row, position.col + 1,character)
        }
    }

    setNewPosition(row, col, character) {
        this.move(row, col, character)
    }

    clearPreviousPosition(character) {
        let position = this.getPosition(character)
        board_service.setPosition(position.row, position.col, 0)
    }

    moveCharacterToAnotherCharacter(character, characterToMove) {
        let positionStart = this.getPosition(character)
        let positionEnd = this.getPosition(characterToMove)

        console.log("position", positionStart)
        console.log("positionEnd", positionEnd)

        let start = {
            col: positionStart.col,
            row: positionStart.row
        }

        let end = {
            col: positionEnd.col,
            row: positionEnd.row
        }

        const path = board_service.getWayBetweenTwoPoints(start,end)

        for(let i = 0; i < path.length-1; i++) {
            setTimeout(() => {
                    this.setNewPosition(path[i].row, path[i].col, character)
            }, 500*i)
        }

        return path
    }
}

export const movement_service = new MovementService()