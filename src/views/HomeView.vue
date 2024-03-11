<script setup>
import { ref } from 'vue'
import {board_service} from '@/services/BoardService'
import {hero_service} from "@/services/HeroService"
import {enemy_service} from "@/services/EnemyService"

let board = ref(board_service.getBoard())


window.addEventListener('keydown', function(e) {
  switch(e.key){
    case "ArrowRight":
      hero_service.moveRight()
      break
    case "ArrowLeft":
      hero_service.moveLeft()
      break
    case "ArrowUp":
      hero_service.moveUp()
      break
    case "ArrowDown":
      hero_service.moveDown()
      break
    case "d":
      enemy_service.moveRight()
      break
    case "a":
      enemy_service.moveLeft()
      break
    case "w":
      enemy_service.moveUp()
      break
    case "s":
      enemy_service.moveDown()
      break
  }
})

const setCharacterStyle = (index) => {
  switch(index){
    case enemy_service.getCharacter():
      return "red"
    case hero_service.getCharacter():
      return "green"
    default:
      return ""
  }
}


setInterval(() => {
  //use A* algorithm to move enemy to Hero
  enemy_service.moveEnemyToHero()
}, 1000)

</script>

<template>
  <section class="justify-content-center">
    <h1>Board</h1>
    <div class="board">
      <div v-for="(row) in board" class="rows">
        <div v-for="(index,col) in row" :key="col.id" class="cols">
          <span :class="setCharacterStyle(index)">{{index}}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.justify-content-center {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.board{
  background: rgba(0, 59, 114, 0.55);
}
.cols {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: inline-block;
  text-align: center;
  line-height: 50px;
}
.red {
  color: red;
}
.green {
  color: #79f679;
}
</style>