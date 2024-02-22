import { onSnake, expandSnake, snakeBody } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPostion()


const score = document.getElementById("score")
const rangeInput = document.getElementById('rangeInputFood');
const currentValueSpan = document.getElementById('currentValueFood');
const randomButton = document.getElementById("randomButton")

currentValueSpan.textContent = rangeInput.value;

let EXPANSION_RATE = parseInt(rangeInput.value); // Initialize SNAKE_SPEED with the initial value

rangeInput.addEventListener('input', function() {
    const newValue = parseInt(rangeInput.value);
    currentValueSpan.textContent = newValue;
    EXPANSION_RATE = newValue; 
});

randomButton.addEventListener('click', function() {
    const newValue = Math.floor(Math.random() * 100);
    currentValueSpan.textContent = newValue
    rangeInput.value = newValue
    EXPANSION_RATE = newValue
    console.log(`Random EXPANSION_RATE = ${newValue}`)
})



export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPostion()
    }
    score.textContent = snakeBody.length -1
    // console.log(snakeBody.length)
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPostion() {
    let newFoodPositon
    while (newFoodPositon == null || onSnake(newFoodPositon)) {
        newFoodPositon = randomGridPosition()
    }
    return newFoodPositon
}