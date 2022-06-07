

const canvasEl = document.getElementById('canvas');
const context = canvasEl.getContext('2d');
context.font = "30px serif";
context.fillStyle = "red"

let lines = [];
let sign = 1;

function createRandomLine() {
    if(lines.length) {
        const top = lines[lines.length - 1].top + sign * Math.floor(Math.random() *  10 + 20);
        const h = Math.floor(Math.random() * 100 + 50);
        const x = lines[lines.length -1].x + 26 + Math.floor(Math.random() * 30 + 40);
        sign = -1 * sign;
        return {top, h, x};
    } else {
        const top = Math.floor(Math.random() * 50 + 150);
        const h = Math.floor(Math.random() * 30 + 50);
        return {top, h, x: 200};
        }
}



function drawLine(line) {
    context.drawImage(flappySheet, 56, 323, 26, 160, line.x, 0, 26, line.top);
    context.drawImage(flappySheet, 84, 323, 26, 160, line.x, line.top + line.h, 26,400 -  line.top - line.h);
}

function updateLines() {
    lines.forEach(line => { line.x -= 2 });
    lines = lines.filter(line => {return line.x > -26});
    if (lines.length < 5) lines.push(createRandomLine());
}

lines.push(createRandomLine());
lines.push(createRandomLine());
lines.push(createRandomLine());
lines.push(createRandomLine());
lines.push(createRandomLine());

const flappySheet = new Image();
flappySheet.src = "flappybird.png";

let flappy = new Sprite(50, 200);
let cells = [{
    "x":115,"y":381,"width":17,"height":12},
    {"x":115,"y":407,"width":17,"height":12},
    {"x":115,"y":433,"width":17,"height":12},
]

flappy.painter = new SpriteSheetPainter(flappySheet, cells, 4, 2);
flappy.direction = 1

flappy.behaviors.push({
    enabled: true,
    exec: (sprite) => {
        sprite.painter.update();
    }
})

flappy.behaviors.push({
    enabled: true,
    exec: (sprite) => {
        sprite.y += sprite.direction * 2
    }
})

function drawBackground() {
    context.drawImage(flappySheet, 146, 0, 144, 256, 0, 0, 288, 512)
}

let landOffset = 0;

function drawLand() {
    context.save();
    context.translate(landOffset, 0);
    context.drawImage(flappySheet,292 , 0,168, 56, 0,400, 336, 112);
    context.restore();
}

function updateLandOffset() {
    if (landOffset > -46) landOffset -=2;
    else landOffset = 0;
}

let score = 0;
function updateScore() {
    for(let i = 0; i < lines.length; i++) {
        if (lines[i].x + 26 < flappy.x) {
            if(!lines[i].scored) {
                score += 1;
                lines[i].scored = true;
            }
        } else {
            break;
        }
    }
}

let gameOver = false;
function checkGameOver() {
    if (flappy.y <= 0 || (flappy.y + 24) >= 400 ) return true;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].x + 26 > flappy.x + 34) return false;
        if ((flappy.x + 34 >= lines[i].x) && (lines[i].x + 26 >= flappy.x)) {
            if ((flappy.y <= lines[i].top) || (flappy.y + 24 >= lines[i].top + lines[i].h)) {
                return true;
            }

        }
    }
}

function clear() {
    context.clearRect(0, 0, 288, 512)
}

function draw() {
    drawBackground();
    drawLand();
    lines.forEach(drawLine);
    flappy.paint(context);

    context.fillText(score, 140, 50);
}

function update() {
    updateLandOffset();
    flappy.exec();
    updateScore();
    updateLines();
}

function animation() {
    clear();
    draw();
    update();
    gameOver = checkGameOver();
    if (gameOver) {
        context.fillText('Game Over', 80, 200)
    }

    if (!gameOver)
 
    requestAnimationFrame(animation);
}

flappySheet.onload = () => {
    animation();
}


document.onkeydown = (e) => {
    if (e.code = "Space") {
        flappy.direction = -1;
    }
}

document.onkeyup = (e) => {
    if (e.code = "Space") {
        flappy.direction = 1;
    }
}