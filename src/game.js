import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, onSnake, expandSnake, snakeBody } from './snake.js'
import{ update as updateFood, draw as drawFood } from './food.js'
import{ outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
const backgroundColor = document.getElementById('backgroundColor')
const score = document.getElementById("score")
const bestScore = document.getElementById("bestScore")

backgroundColor.addEventListener('input', function(){
    draw(document.getElementById('game-board'));
})



const topScore = [];
let currentBestScore = localStorage.getItem("bestScore") || 0;

// Display the initial best score when the page loads
bestScore.textContent = "Best Score: " + currentBestScore;
function main(currentTime) {
    
    if (gameOver) {
        const currentScore = parseInt(score.textContent);
        topScore.push(currentScore);
        topScore.sort((a, b) => b - a);
        const topScoresToShow = topScore.slice(0, 1);

        // Update the best score only if it's a new best score
        if (topScoresToShow[0] > currentBestScore) {
            currentBestScore = topScoresToShow[0];
           
            bestScore.textContent = "Best Score: " + currentBestScore;

            // Store the best score in localStorage
            localStorage.setItem("bestScore", currentBestScore);
        }

        if(alert('Your score is: ' + score.textContent )){
            location.reload()
        } else {
            location.reload()
        }

        return

    }
    
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    gameBoard.style.backgroundColor = backgroundColor.value
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
} 

