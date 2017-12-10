/*
Content:
1.1 - Board constructor 
1.2 - Gun constructor
1.3 - Player constructor
1.4 - Init constructor - contains generating methods for initializing Board, Gun, Players, Bushes
2.0 - Creating objects instances
3.0 - Start function
4.0 - Creating Canvas
4.1 - Creating Sprites
4.2 - UpdateBoard function - updates Canvas instances once Called
5.0 - Event listener
*/


// 1.1 - Board Object
function Board(a, b) {
    this.a = a;
    this.b = b;
    this.layout = [];

    this.display = function () {
        return this.layout;
    }
}

/*-------------------------------------------------------------------*/
// 1.2 - Gun Object
function Gun(name, id, damage) {
    this.name = name;
    this.id = id;
    this.damage = damage;
}

/*-------------------------------------------------------------------*/
// 1.3 - Player
function Player(playerId, hp, activeGun, x, y) {
    this.x = x;
    this.y = y;
    this.playerId = playerId;
    this.hp = hp;
    this.gunInventory = [activeGun];
    this.moveDistance = 0;
    this.moveDirection;


    this.move = function (direction) {

        switch (direction) {
            case "up":
                if (this.y - 1 < 0 || game1.layout[this.y - 1][this.x] == 9 || game1.layout[this.y - 1][this.x] == 8 || game1.layout[this.y - 1][this.x] == 1) {
                    console.log("This move is not possible!");
                } else {
                    this.y = this.y - 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + this.x + ", " + (this.y + 1) + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            case "right":
                if (this.x + 1 > 9 || game1.layout[this.y][this.x + 1] == 9 || game1.layout[this.y][this.x + 1] == 8 || game1.layout[this.y][this.x + 1] == 1) {
                    console.log("This move is not possible!");
                } else {
                    this.x = this.x + 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + (this.x - 1) + ", " + this.y + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            case "down":
                if (this.y + 1 > 9 || game1.layout[this.y + 1][this.x] == 9 || game1.layout[this.y + 1][this.x] == 8 || game1.layout[this.y + 1][this.x] == 1) {
                    console.log("This move is not possible!");
                } else {
                    this.y = this.y + 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + this.x + ", " + (this.y - 1) + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            case "left":
                if (this.x - 1 < 0 || game1.layout[this.y][this.x - 1] == 9 || game1.layout[this.y][this.x - 1] == 8 || game1.layout[this.y][this.x - 1] == 1) {
                    console.log("This move is not possible!");
                } else {
                    this.x = this.x - 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + (this.x + 1) + ", " + this.y + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            default:
                console.log("unknown expression");
        }
    }
}

/*-------------------------------------------------------------------*/
//1.4 Init Object for generating game
function Init() {

    // Board method generator 
    this.gameBoard = function (boardName) {
        for (i = 0; i < boardName.a; i++) {
            boardName.layout.push([]);

            for (z = 0; z < boardName.b; z++) {
                boardName.layout[i][z] = 0;
            }
        }
    }

    //Bush method genetaror
    this.gameBush = function (boardName) {
        var bush = Math.floor(Math.random() * (boardName.a * boardName.a * 0.12) + 8);

        for (i = 0; i < bush; i++) {
            var x = Math.floor(Math.random() * boardName.layout.length);
            var y = Math.floor(Math.random() * boardName.layout[0].length);

            while (boardName.layout[x][y] == 1) {
                x = Math.floor(Math.random() * boardName.layout.length);
                y = Math.floor(Math.random() * boardName.layout[0].length);
            }

            boardName.layout[x][y] = 1;
            console.log("number of bushes generated: " + bush);
        }


    }


    //Gun method generator
    this.gameGun = function (boardName, gunId) {
        var y = Math.floor(Math.random() * boardName.layout.length);
        var z = Math.floor(Math.random() * boardName.layout[0].length);

        while (!(boardName.layout[y][z] == "0")) {
            y = Math.floor(Math.random() * boardName.layout.length);
            z = Math.floor(Math.random() * boardName.layout[0].length);
        }
        boardName.layout[y][z] = gunId;
    }

    //Player method generator
    this.gamePlayer = function (boardName, player) {
        player.x = Math.floor(Math.random() * boardName.layout.length);
        player.y = Math.floor(Math.random() * boardName.layout[0].length);

        while (!(boardName.layout[player.x][player.y] == "0")) {
            player.x = Math.floor(Math.random() * boardName.layout.length);
            player.y = Math.floor(Math.random() * boardName.layout[0].length);
        }

        boardName.layout[player.y][player.x] = player.playerId;

        console.log("player with ID " + player.playerId + " is on position " + "(" + player.x + ", " + player.y + ")");
    }

}


/*-------------------------------------------------------------------*/
// 2.0 - Creating objects instances
var game1 = new Board(10, 10);
var init = new Init();

var gun0 = new Gun("Baloon", 3, 5);
var gun1 = new Gun("Bat", 4, 10);
var gun2 = new Gun("Ball", 5, 20);
var gun3 = new Gun("Bomb", 6, 30);

var player1 = new Player(8, 100, gun0.id, 0, 0);
var player2 = new Player(9, 100, gun0.id, 0, 0);
var player1Turn = true; //to check whos turn it is


/*-------------------------------------------------------------------*/
// 3.0 - Start function - starts the game once called
function start() {
    game1.layout = [];
    init.gameBoard(game1);
    init.gameBush(game1);

    init.gameGun(game1, gun1.id);
    init.gameGun(game1, gun2.id);
    init.gameGun(game1, gun3.id);

    init.gamePlayer(game1, player1);
    init.gamePlayer(game1, player2);

    console.log(game1.display());

    //why does this work? I am not sure
    canvas.width = canvas.width;
    updateBoard();

}

/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
// 4.0 - Creating Canvas
var canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;

var c = canvas.getContext("2d");


/*-------------------------------------------------------------------*/
//4.1 - Creating sprites
var p1 = new Image();
var p2 = new Image();
var bushImage = new Image();


var w1 = new Image();
var w2 = new Image();
var w3 = new Image();
var w4 = new Image();

p1.src = "assets/p1.png";
p2.src = "assets/p2.png";
bushImage.src = "assets/bush.png";

w1.src = "assets/weapon1.png";
w2.src = "assets/weapon2.png";
w3.src = "assets/weapon3.png";
w4.src = "assets/weapon4.png";


/*-------------------------------------------------------------------*/
//4.1 - This function will update the canvas game instance
function updateBoard() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    var xPos = 0;
    var yPos = 0;

    for (var x = 0; x < game1.layout.length; x++) {
        for (var y = 0; y < game1.layout[x].length; y++) {

            c.strokeRect(xPos, yPos, 80, 80);

            if (game1.layout[x][y] == 1) {
                c.drawImage(bushImage, xPos, yPos);
            }

            if (game1.layout[x][y] == 3) {
                //create animation here
                c.drawImage(w1, xPos, yPos);
            }

            if (game1.layout[x][y] == 4) {
                //create animation here
                c.drawImage(w2, xPos, yPos);
            }

            if (game1.layout[x][y] == 5) {
                c.drawImage(w3, xPos, yPos);
            }

            if (game1.layout[x][y] == 6) {
                c.drawImage(w4, xPos, yPos);
            }

            if (game1.layout[x][y] == 8) {
                c.drawImage(p1, xPos, yPos);
            }

            if (game1.layout[x][y] == 9) {
                c.drawImage(p2, xPos, yPos);
            }

            xPos += 80;

        }
        xPos = 0;
        yPos += 80;
    }
}

/*-------------------------------------------------------------------*/
//5.0 - Event listener
function action(e) {
    var playerMoving;
    if (player1Turn) {
        playerMoving = player1;
    } else {
        playerMoving = player2;
    }

    function moveAction(direction) {

        if (playerMoving.moveDistance >= 3) {
            console.log("You cannot move anymore!");
        } else if (playerMoving.moveDistance > 0 && direction !== playerMoving.moveDirection) {
            console.log("You cannot move " + direction + ". You can only move " + playerMoving.moveDirection);
        } else {

            if (playerMoving.gunInventory.length > 1) {
                game1.layout[playerMoving.y][playerMoving.x] = playerMoving.gunInventory[0];
                playerMoving.gunInventory.shift();
            } else {
                game1.layout[playerMoving.y][playerMoving.x] = 0;
            }

            playerMoving.move(direction);

            //---------------
            // this will add gun into inventory if player cross one
            var gunOnTheMap;
            var mapObject = game1.layout[playerMoving.y][playerMoving.x];

            if (mapObject == 3 || mapObject == 4 || mapObject == 5 || mapObject == 6) {
                gunOnTheMap = mapObject;
                playerMoving.gunInventory.push(gunOnTheMap);
            }
            //---------------

            game1.layout[playerMoving.y][playerMoving.x] = playerMoving.playerId;
            updateBoard();
            console.log(direction + " arrow: " + e.keyCode);
            playerMoving.moveDirection = direction;
        }
    }

    switch (e.keyCode) {

        case 38:
            moveAction("up");
            break;

        case 39:
            moveAction("right");
            break;

        case 40:
            moveAction("down");
            break;

        case 37:
            moveAction("left");
            break;

        case 81:
            if (player1Turn) {
                player1Turn = false;
            } else {
                player1Turn = true;
            }

            playerMoving.moveDistance = 0;
            console.log("End round - Q key: " + e.keyCode);
            break;




        default:
            console.log(e.keyCode);
    }

    //    c.clearRect(0, 0, canvas.width, canvas.height);
    //     canvas.width = canvas.width;
    //     canvas.height = canvas.height;



}

document.onkeydown = action;