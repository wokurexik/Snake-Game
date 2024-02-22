import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, onSnake, expandSnake, snakeBody } from './snake.js'
import{ update as updateFood, draw as drawFood } from './food.js'
import{ outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')


function main(currentTime) {
    
    if (gameOver) {
        const score = snakeBody.length -1
        if(confirm('You lose!' + " " + 'Tvé score je: ' + score )){
            location.reload()
        }
        return

    }
    
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
} 

