/*
1.0 - Creating Canvas
2.0 - Creating sprites
3.0 - This function will update the canvas game instance(refresh canvas)
5.0 - This function updates DOM elements once called (colors, text)
6.0 - This function will clear the game console section element
*/


/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
// 1.0 - Creating Canvas
var canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;

var c = canvas.getContext("2d");


/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
//2.0 - Creating sprites
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
/*-------------------------------------------------------------------*/
//3.0 - This function will update the canvas game instance
function updateBoard() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    var xPos = 0;
    var yPos = 0;

    for (var x = 0; x < board.layout.length; x++) {
        for (var y = 0; y < board.layout[x].length; y++) {

            c.strokeRect(xPos, yPos, 80, 80);


            if (board.layout[x][y] == gameConstant.BUSH) {
                c.drawImage(bushImage, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.GUN_BALOON) {
                //create animation here
                c.drawImage(w1, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.GUN_BAT) {
                //create animation here
                c.drawImage(w2, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.GUN_BALL) {
                c.drawImage(w3, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.GUN_BOMB) {
                c.drawImage(w4, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.PLAYER1) {
                c.drawImage(p1, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.PLAYER2) {
                c.drawImage(p2, xPos, yPos);
            }

            xPos += 80;

        }
        xPos = 0;
        yPos += 80;
    }
}

/*---------------------------------------------------------------*/
/*-----------------------DOM Manipulation------------------------*/
/*---------------------------------------------------------------*/

/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/


/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
//5.0 - This function updates DOM elements once called (colors, text)
function updateDom() {
    $("#p1_hp").html(player1.hp);
    $("#p1_weapon").html(player1.gunInventory[0].name);
    $("#p1_damage").html(player1.gunInventory[0].damage);
    $("#p1_movement").html(3 - player1.moveDistance);

    $("#p2_hp").html(player2.hp);
    $("#p2_weapon").html(player2.gunInventory[0].name);
    $("#p2_damage").html(player2.gunInventory[0].damage);
    $("#p2_movement").html(3 - player2.moveDistance);


    if (player1Turn) {
        $(".player1").css("background-color", "#adf37f");
        $(".player2").css("background-color", "white");

        /*Why is JQuery not working for selecting p1_turn?*/
        $("#p1_turn").html("Player1: <span style=\"color: red;\">It's my turn!</span>");
        $("#p2_turn").html("Player2");
    } else {
        $("#p2_turn").html("Player2: <span style=\"color: red;\">It's my turn!</span>");
        $("#p1_turn").html("Player1");

        $(".player1").css("background-color", "white");
        $(".player2").css("background-color", "#adf37f");


    }

    clearConsole();
}

/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
//6.0 - This function will clear the game console section element
function clearConsole() {
    setTimeout(function () {
        $("#consoleOutput").html("---");
    }, 5000);
}