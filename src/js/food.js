import { onSnake, expandSnake, snakeBody } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition()


const score = document.getElementById("score")
const rangeInput = document.getElementById('rangeInputFood');
const currentValueSpan = document.getElementById('currentValueFood');
const randomButton = document.getElementById("randomButton")
const foodColor = document.getElementById("foodColor");

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
    // console.log(`Random EXPANSION_RATE = ${newValue}`)
})

foodColor.addEventListener('input', function(){
    // Trigger the draw function to update the snake's color
    draw(document.getElementById('game-board'));
});


export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        score.textContent = ++score.textContent
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.style.backgroundColor = foodColor.value
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}