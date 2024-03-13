import { EnemyEntity } from '@/Entities/EnemyEntity'
import { movement_service } from "@/services/MovementService"
import {HeroEntity} from "@/Entities/HeroEntity";
import {board_service} from "@/services/BoardService";

class EnemyService extends EnemyEntity{
    constructor() {
        super()
        this.ENEMY = EnemyEntity.ENEMY
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
    }
}
export const enemy_service = new EnemyService()