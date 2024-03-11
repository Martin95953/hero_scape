import { EnemyEntity } from '@/Entities/EnemyEntity'
import { movement_service } from "@/services/MovementService"
import {HeroEntity} from "@/Entities/HeroEntity";

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
        let position = movement_service.getPosition(this.ENEMY)
        let heroPosition = movement_service.getPosition(HeroEntity.HERO)
        if (position[0] > heroPosition[0]) {
            this.moveUp()
        }
        if (position[0] < heroPosition[0]) {
            this.moveDown()
        }
        if (position[1] > heroPosition[1]) {
            this.moveLeft()
        }
        if (position[1] < heroPosition[1]) {
            this.moveRight()
        }

    }
}
export const enemy_service = new EnemyService()