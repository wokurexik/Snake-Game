import { getInputDirection } from "./input.js";

let newSegments = 0;

const rangeInput = document.getElementById('rangeInput');
const currentValueSpan = document.getElementById('currentValue');
const randomButton = document.getElementById('randomButton');
const snakeColorPicker = document.getElementById('snakeColor');
const snake = document.getElementsByClassName('snake');

currentValueSpan.textContent = rangeInput.value;

let SNAKE_SPEED = parseInt(rangeInput.value); // Initialize SNAKE_SPEED with the initial value

rangeInput.addEventListener('input', function() {
    const newValue = parseInt(rangeInput.value); // Parse the value as an integer
    currentValueSpan.textContent = newValue;
    SNAKE_SPEED = newValue; // Update SNAKE_SPEED with the new value
});

randomButton.addEventListener('click', function() {
    const newValue = Math.floor(Math.random() * 100);
    currentValueSpan.textContent = newValue;
    rangeInput.value = newValue;
    SNAKE_SPEED = newValue;

    console.log(`Random SNAKE_SPEED = ${newValue}`);
});

snakeColorPicker.addEventListener('input', function(){
    // Trigger the draw function to update the snake's color
    draw(document.getElementById('game-board'));
});

export const snakeBody = [{ x: 11, y: 11 }];
export { SNAKE_SPEED }; // Export SNAKE_SPEED

export function update() {
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    } 

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    // Remove existing snake elements
    document.querySelectorAll('.snake').forEach(element => element.remove());

    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        snakeElement.style.backgroundColor = snakeColorPicker.value; // Set the background color
        gameBoard.appendChild(snakeElement);
    });
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    }); 
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true});
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }

    newSegments = 0;
}