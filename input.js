let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };
let isPaused = false;

window.addEventListener('keydown', e => {
    switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            break;

        case 's':
        case 'arrowdown':
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            break;

        case 'a':
        case 'arrowleft':
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;

        case 'd':
        case 'arrowright':
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 };
            break;
    }
});

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}