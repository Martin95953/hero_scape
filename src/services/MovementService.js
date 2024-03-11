import {board_service} from "@/services/BoardService"
import {HeroEntity} from "@/Entities/HeroEntity"
import {EnemyEntity} from "@/Entities/EnemyEntity"

class MovementService {
    CAN_MOVE_IN_BOARD = [HeroEntity.HERO, EnemyEntity.ENEMY]
    getPosition(character) {
        let position = []
        board_service.getBoard().forEach((row, i) => {
            row.forEach((col, j) => {
                if (col === character) {
                    position.push(i)
                    position.push(j)
                }
            })
        })
        return position
    }
    canMove(character) {
        return this.CAN_MOVE_IN_BOARD.includes(character)
    }
    move(x, y,character) {
        let position = this.getPosition(character)
        if(board_service.validateFreePosition(x, y) && this.canMove(character)) {
            let boardValue = board_service.getBoard()
            if (boardValue[position[0]] && boardValue[x]) {
                board_service.setPosition(position[0], position[1], 0)
                board_service.setPosition(x, y, character)
            }
        }
    }
    moveUp(character) {
        let position = this.getPosition(character)
        if (position[0] > 0) {
            this.move(position[0] - 1, position[1],character)
        }
    }
    moveDown(character) {
        let position = this.getPosition(character)
        if (position[0] < board_service.getBoard().length - 1) {
            this.move(position[0] + 1, position[1],character)
        }
    }
    moveLeft(character) {
        let position = this.getPosition(character)
        if (position[1] > 0) {
            this.move(position[0], position[1] - 1,character)
        }
    }
    moveRight(character) {
        let position = this.getPosition(character)
        if (position[1] < board_service.getBoard().length - 1) {
            this.move(position[0], position[1] + 1,character)
        }
    }
}

export const movement_service = new MovementService()