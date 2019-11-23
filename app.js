const scoreboard = document.querySelector("#current-score");
const highScore = document.querySelector("#high-score");

let audio = new Audio("bite.mp3");

let speed = 700;

updateScore = () => {
    score++;
    if(score > highScorePoints) {
        localStorage.setItem("score", JSON.stringify(score));
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        highScore.textContent = `High Score: ${getHighScore()}`;
    }
    scoreboard.textContent = `Current Score: ${score}`; 
}

getHighScore = () => {
    if(localStorage.getItem("score")) {
        return JSON.parse(localStorage.getItem("score"));
    } else {
        return 0;
    }
}

let score = 0;
let highScorePoints = getHighScore();

scoreboard.textContent = `Current Score: ${score}`; 
highScore.textContent = `High Score: ${getHighScore()}`;

let body = [];

const conteiner = document.querySelector("#conteiner");

makeGrid = () => {
    for(let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        div.setAttribute("id", i);
        div.setAttribute("class", "sq");
        div.style.width = "48px";
        div.style.height = "48px";
        conteiner.appendChild(div);
    }
}
makeGrid();


const grid = Array.from(document.querySelectorAll(".sq"));
const arr = [];
let direction = "ArrowLeft";


for(let i = 0; i < 10; i++) {
    arr.push([]);
}


for(let i = 0, s = 0; i < 10, s < 100; i++) {
    for(let j = 0; j < 10; j++, s++) {
        arr[i][j] = grid[s];
    }
}
let oldDirection = "";

class Snake {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    spawnSnake () {
        arr[this.x][this.y].style.backgroundColor = "#000000";
        arr[this.x][this.y].setAttribute("title", "snake");
    }

    move () {
        if(this.direction === "ArrowLeft") {
            try {
                arr[this.x][this.y].style.backgroundColor = "#ffffff";
                if(arr[this.x][this.y - 1].style.backgroundColor === "rgb(0, 0, 0)") {
                    clearInterval(myInterval);
                } else {
                    arr[this.x][this.y - 1].style.backgroundColor = "#000000";
                    this.y = this.y - 1;
                }
                
            } catch {
                arr[this.x][9].style.backgroundColor = "#000000";
                    this.y = 9;    
                //clearInterval(myInterval);
                    //throw new Error("You hit a wall");
                }
        } else if(this.direction === "ArrowRight") {
            try {
                //oldValues = [this.x, this.y];
                arr[this.x][this.y].style.backgroundColor = "#ffffff";
                if(arr[this.x][this.y + 1].style.backgroundColor === "rgb(0, 0, 0)") {
                    clearInterval(myInterval);
                } else {
                    arr[this.x][this.y + 1].style.backgroundColor = "#000000";
                    this.y = this.y + 1;
                }
            } catch {
                arr[this.x][0].style.backgroundColor = "#000000";
                    this.y = 0;
            }
        } else if(this.direction === "ArrowUp") {
            try {
                //oldValues = [this.x, this.y];
                arr[this.x][this.y].style.backgroundColor = "#ffffff";
                if(arr[this.x - 1][this.y].style.backgroundColor === "rgb(0, 0, 0)") {
                    clearInterval(myInterval);
                } else {
                    arr[this.x - 1][this.y].style.backgroundColor = "#000000";
                    this.x = this.x - 1;
                }   
            } catch (e) {
                arr[9][this.y].style.backgroundColor = "#000000";
                    this.x = 9;
            }
        } else if(this.direction === "ArrowDown") {
            try {
                //oldValues = [this.x, this.y];
                arr[this.x][this.y].style.backgroundColor = "#ffffff";
                if(arr[this.x + 1][this.y].style.backgroundColor === "rgb(0, 0, 0)") {
                    clearInterval(myInterval);
                } else {
                    arr[this.x + 1][this.y].style.backgroundColor = "#000000";
                    this.x = this.x + 1;
                }  
                } catch(e) {
                    arr[0][this.y].style.backgroundColor = "#000000";
                    this.x = 0;
                }
        }
    }

    checkForFood() {
        if(arr[this.x][this.y].title === "food") {
            arr[this.x][this.y].setAttribute("title", "field");
            return true 
        } else {
            return false
        }
    }

    grow(x, y) {
        const newBodyPart = new Snake(x, y, direction);
        newBodyPart.spawnSnake();
        body.push(newBodyPart);
    }


    
}



spawnSnake = () => {
    
        arr[a][b].style.backgroundColor = "#000000";
        arr[a][b].setAttribute("title", "snake");
    
}

spawnFood = () => {
    const arr = grid.filter(e => e.style.backgroundColor !== "rgb(0, 0, 0)");
    const element = arr[Math.floor(Math.random() * Math.floor(arr.length))];
    element.style.backgroundColor = "red";
    element.setAttribute("title", "food");
}

checkForSnake = (snake) => {
    if(snake.style.backgroundColor === "rgb(0, 0, 0)") {
        return true;
    } else {
        false;
    }
}

spawnFood();
const head = new Snake(4, 5, direction);
const bodyPart1 = new Snake(4, 6, direction);
const bodyPart2 = new Snake(4, 7, direction);
const bodyPart3 = new Snake(4, 8, direction);

body.push(head);
body.push(bodyPart1);
body.push(bodyPart2);
body.push(bodyPart3);

head.spawnSnake();
bodyPart1.spawnSnake();
bodyPart2.spawnSnake();



const myInterval = setInterval(function() {
    //turn the arr backwards   
    let x = 0;
    let y = 0;
    let food = false;
    for(let i = body.length - 1; i > -1; i--) {
            if(i === 0) {
                body[i].direction = direction;
            } else {
                body[i].direction = body[i - 1].direction;
                console.log(`BodyPart ${i} X: ${body[i].x}`);
                console.log(`BodyPart ${i} Y: ${body[i].y}`);
                
            }
        }
      //bodyPart2.direction = bodyPart1.direction;
      //bodyPart1.direction = head.direction;
      //head.direction = direction;      
        for(let i = 0; i < body.length; i++) {
            if(i === 0) {
                if(body[i].checkForFood()) {
                    food = true;
                    x = body[body.length - 1].x;
                    y = body[body.length - 1].y;
                }
                
            }
            body[i].move();
        }
        if(food) {
            audio.play();
            body[body.length - 1].grow(x, y);
            
            updateScore();
            spawnFood();
        }    
}, 600);


window.addEventListener("keydown", function(event) {
    if(direction === "ArrowLeft" && event.key === "ArrowRight" || direction === "ArrowRight" && event.key === "ArrowLeft") {
            
    } else if(direction === "ArrowUp" && event.key === "ArrowDown" || direction === "ArrowDown" && event.key === "ArrowUp") {
    
    } else {
        direction = event.key;

    }
        //move(snakeLocation[0], snakeLocation[1]);
});






