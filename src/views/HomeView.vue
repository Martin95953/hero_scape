<script setup>
import { ref } from 'vue'
import {board_service} from '@/services/BoardService'
import {hero_service} from "@/services/HeroService"
import {enemy_service} from "@/services/EnemyService"

let board = ref(board_service.getBoard())
let is_playing = ref(false)

window.addEventListener('keydown', function(e) {
  if(!is_playing.value) return
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
      return "enemy"
    case hero_service.getCharacter():
      return "hero"
    case 1:
      return "blue"
    case 2:
      return "blue"
    default:
      return ""
  }
}


const play = () => {
  is_playing.value = true
  playSound()
  activeEnemyMovement()
}

function playSound(){
  const audio = new Audio(require(`@/assets/sounds/background.wav`))
  audio.play()
  audio.loop = true
}

function activeEnemyMovement(){
  setInterval(() => {
    enemy_service.moveEnemyToHero()
  }, 1000)
}



</script>

<template>
  <section class="justify-content-center">
    <h1>Scape & Survive</h1>
    <div class="board">
      <div v-for="(row) in board" class="rows">
        <div v-for="(index,col) in row" :key="col.id" class="cols">
          <span :class="setCharacterStyle(index)">{{index}}</span>
        </div>
      </div>
    </div>
    <div>
      <h2>Instructions</h2>
      <p>Use the arrow keys to move the hero</p>
      <p>Use the 'wasd' keys to move the enemy</p>
    </div>
    <div>
      <button @click="play">PLAY</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.justify-content-center {
  display: flex;
  align-items: center;
  flex-direction: column;
}
h1 {
  color: yellow;
}
.board{
  background: rgb(0, 0, 0);
}
.cols {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: inline-block;
  text-align: center;
  line-height: 50px;
}
.enemy {
  color: red;
}
.hero {
  color: yellow;
}
.blue {
  color: #2626fc;
}
</style>