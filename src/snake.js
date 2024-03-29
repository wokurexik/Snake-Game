import { getInputDirection } from "./input.js";

let newSegments = 0;
let isPaused = false;

const rangeInput = document.getElementById('rangeInput');
const currentValueSpan = document.getElementById('currentValue');
const randomButton = document.getElementById('randomButton');
const snakeColorPicker = document.getElementById('snakeColor');
const snakeHeadColor = document.getElementById('snakeHeadColor');
const randomColors = document.getElementById('randomButtonColors');
const paused = document.getElementById("paused")
const countDownText = document.getElementById("countdown")

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

    // console.log(`Random SNAKE_SPEED = ${newValue}`);
});

randomColors.addEventListener('click', function(){
    snakeColorPicker.value = '#'+Math.floor(Math.random()*16777215).toString(16);
    snakeHeadColor.value = '#'+Math.floor(Math.random()*16777215).toString(16);
    backgroundColor.value = '#'+Math.floor(Math.random()*16777215).toString(16);
    foodColor.value = '#'+Math.floor(Math.random()*16777215).toString(16);
})


snakeColorPicker.addEventListener('input', function(){
    // Trigger the draw function to update the snake's color
    draw(document.getElementById('game-board'));
});

snakeHeadColor.addEventListener('input', function(){
    // Trigger the draw function to update the snake's color
    draw(document.getElementById('game-board'));
});

export const snakeBody = [{ x: 11, y: 11 }];
export { SNAKE_SPEED , isPaused }; // Export SNAKE_SPEED
let countdown = 3

window.addEventListener('keydown', e => {
    switch (e.key) {
        case ' ':
            isPaused = !isPaused;
            if(isPaused == true){
                paused.style.display="block"
            } else {
                paused.style.display="none"
                startCountdown()
            break;
            }
    }
});

function startCountdown() {
    isPaused = true; // Set isPaused to true initially

    countdown = 3;
    const countdownInterval = setInterval(() => {
        countDownText.style.display="block"
        countDownText.textContent = countdown;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(countdownInterval);
            countDownText.style.display="none"
            isPaused = false; // Set isPaused to false once the countdown is complete
        }

    }, 600);
}

export function update() {
    if(!isPaused){
        addSegments();
        const inputDirection = getInputDirection();


        for (let i = snakeBody.length - 2; i >= 0; i--) {
            snakeBody[i + 1] = { ...snakeBody[i] };
        } 
        
        
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}
}

export function draw(gameBoard) {
    // Remove existing snake elements
    document.querySelectorAll('.snake').forEach(element => element.remove());

    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        // Set the background color based on the segment's position
        if (index === 0) {
            snakeElement.style.backgroundColor = snakeHeadColor.value;
        } else {
            snakeElement.style.backgroundColor = snakeColorPicker.value;
        }

        snakeElement.style.border = '3px solid black';
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