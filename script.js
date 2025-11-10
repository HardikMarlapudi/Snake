let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let snake = [];
let food = {};
let direction = "right";
let score = 0;
let game;
const box = 20;

function startGame() {
    score = 0;
    snake = [{x: 100, y: 100}];
    direction = "right";
    
    food = {
        x: Math.floor(Math.random() * canvas.width / box) * box,
        y: Math.floor(Math.random() * canvas.height / box) * box
    };

    document.getElementById("scoreTracker").innerHTML = `Score: ${score}`;
    clearInterval(game);
    game = setInterval(drawGame, 100);

    document.addEventListener("keydown", function (event) {
        switch(event.key) {
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;

            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;

            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;

            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
        }
    });
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw the snake
    ctx.fillStyle = "green";
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, box, box);
    }

    // Move the snake
    let head = { ...snake[0] };
    if (direction === "left") head.x -= box;
    if (direction === "right") head.x += box;
    if (direction === "up") head.y -= box;
    if (direction === "down") head.y += box;

    // Wall Collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) { 
            clearInterval(game);
            setTimeout(() => {
            alert(`Game Over! You scored ${score} points.`);
            startGame();
        }, 1000);
        return;
    }

    // Snake Collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            clearInterval(game);
            setTimeout(() => {
                alert(`Game Over! You scored ${score} points.`);
                startGame();
            }, 1000);
            return;
        } 
    }

    // Eat the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("scoreTracker").textContent = "Score: " + score;
        food = {
            x: Math.floor(Math.random() * canvas.width / box) * box,
            y: Math.floor(Math.random() * canvas.height / box) * box
        };
    } else {
        snake.pop();
    }
    snake.unshift(head);
}
