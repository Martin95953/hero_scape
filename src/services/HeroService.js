import { HeroEntity } from '@/Entities/HeroEntity'
import { movement_service } from "@/services/MovementService"
class HeroService extends HeroEntity{
    getCharacter() {
        return this.HERO
    }
    moveRight() {
        movement_service.moveRight(this.HERO)
    }
    moveLeft() {
        movement_service.moveLeft(this.HERO)
    }
    moveUp() {
        movement_service.moveUp(this.HERO)
    }
    moveDown() {
        movement_service.moveDown(this.HERO)
    }
}
export const hero_service = new HeroService()