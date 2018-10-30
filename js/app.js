var Furry = require("./furry.js");
var Coin = require("./coins.js");
var Game = require("./game.js");




var game = new Game();
game.startGame();


document.addEventListener('keydown', function(event){
    game.turnFurry(event);
});



