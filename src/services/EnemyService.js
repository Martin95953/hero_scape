import { EnemyEntity } from '@/Entities/EnemyEntity'
import { movement_service } from "@/services/MovementService"
import {HeroEntity} from "@/Entities/HeroEntity";
import {board_service} from "@/services/BoardService";

class EnemyService extends EnemyEntity{
    constructor() {
        super()
        this.ENEMY = EnemyEntity.ENEMY
        this.loose = false
    }
    getCharacter() {
        return this.ENEMY
    }
    moveRight() {
        movement_service.moveRight(this.ENEMY)
    }
    moveLeft() {
        movement_service.moveLeft(this.ENEMY)
    }
    moveUp() {
        movement_service.moveUp(this.ENEMY)
    }
    moveDown() {
        movement_service.moveDown(this.ENEMY)
    }

    moveEnemyToHero() {
        movement_service.moveCharacterToAnotherCharacter(this.ENEMY, HeroEntity.HERO)
        if(this.checkIfEnemyIsInRangeToAttack() && !this.loose) {
            alert("You loose!")
            this.loose = true
            board_service.restartGame()
        }
    }

    checkIfEnemyIsInRangeToAttack() {
        let position = movement_service.getPosition(this.ENEMY)
        let heroPosition = movement_service.getPosition(HeroEntity.HERO)
        let distance = Math.sqrt(Math.pow(position.row - heroPosition.row, 2) + Math.pow(position.col - heroPosition.col, 2))
        console.log("distance", distance)
        return distance < 2
    }
}
export const enemy_service = new EnemyService()