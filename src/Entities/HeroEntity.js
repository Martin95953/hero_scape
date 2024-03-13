import {ref} from "vue"

class HeroEntity {

    static HERO = "H"

    INITIAL_POSITION = {
        row: 2,
        col: 0
    }

    LIFE = ref(100)

    ATTACK = 10

    SPEED = 1

    RESISTANCE = 10

    constructor() {
        this.HERO = HeroEntity.HERO
    }

}

export { HeroEntity }