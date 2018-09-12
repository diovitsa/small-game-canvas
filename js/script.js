var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//Стартовые позиции
var x = canvas.width / 2;
var y = canvas.height - 30;
var ballRadius = 10;

//Случайное направление
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return rand;
  }

//Шаг изменения позиции
var a = randomInteger(1.5,2.5);
var xLine = [a,-a];
var dx = xLine[Math.floor(Math.random()*(xLine.length))];
if(dx > 0){
    var dy = (-4) + dx;
}
else{
    var dy = (-4) - dx; 
}


//Планка
var stripHeight = 10;
var stripWidth = 70;
var stripX = (canvas.width - stripWidth) / 2;
//Переменные по передвижению
var rightPressed = false;
var leftPressed = false;
//События  и функции при нажатии кнопок вправо-влево
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

//Прорисовка планки 
function drawStrip() {
    ctx.beginPath();
    ctx.rect(stripX, canvas.height - stripHeight, stripWidth, stripHeight);
    ctx.fillStyle = "#00E204";
    ctx.fill();
    ctx.closePath();
}

//Прорисовка шарика
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#AA50E2";
    ctx.fill();
    ctx.closePath();
}
//Движение шарика
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawStrip();
    x += dx;
    y += dy;
    //Отскок от стен
    if (x + dx > canvas.width - ballRadius || x + dx - ballRadius < 0) {
        dx = -dx;
    }
    if (/*y + dy > canvas.height - ballRadius ||*/  y + dy < ballRadius) {
        dy = -dy;
    }

    else if (y + dy > canvas.height - ballRadius - 5) {
        if (x > stripX && x < stripX + stripWidth) {
            dy = -dy;
        }
        else {
            var life = document.getElementById("life");
            var chance = life.innerHTML;
            var newChance = parseInt(chance) - 1;
            life.innerHTML = newChance;
            dy = -dy;
            //Проверка на количество жизней 
            if (life.innerHTML == 0) {
                alert("Game over")
                clearInterval(round);
            }

        }
    }

    // Движение планки
    if (rightPressed && stripX + stripWidth < 480) {
        stripX += 3;
    }
    else if (leftPressed && stripX > 0) {
        stripX -= 3;
    }
}
var round = setInterval(draw, 10);
