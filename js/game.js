var Furry = require("./furry.js");
var Coin = require("./coins.js");

function Game() {
    this.board = document.querySelector("#board").children;
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    };

    this.showFurry = function() {
        this.hideVisibleFurry();
        this.board[ this.index(this.furry.x, this.furry.y)].classList.add("furry");
    };

    this.showCoin = function() {
        this.board[ this.index(this.coin.x, this.coin.y)].classList.add("coin");
    };

    this.moveFurry = function () {

        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y + 1;
        };

        if(!this.gameOver()) {
            this.showFurry();
            this.checkCoinCollision();
        };
    };

    this.startGame = function () {
        this.showCoin();
        var self = this;
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 250);
    };

    this.hideVisibleFurry = function () {
        document.querySelector(".furry").classList.remove("furry");
    };

    this.turnFurry = function (event) {
        var self2 = this;
        switch (event.which) {
            case 37:
                self2.furry.direction = 'left';
                break;
            case 40:
                self2.furry.direction = 'up';
                break;
            case 39:
                self2.furry.direction = 'right';
                break;
            case 38:
                self2.furry.direction = 'down';
                break;
        }
    };

    this.checkCoinCollision = function () {
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            document.querySelector(".coin").classList.remove("coin");
            this.score = this.score + 1;
            document.querySelector("#score").firstElementChild.lastElementChild.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function() {
        if ( this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9  ) {
            clearInterval(this.startGame);
            this.hideVisibleFurry();

            document.querySelector("#board").classList.add("invisible");
            document.querySelector("#over").classList.remove("invisible");
            document.querySelector("#over").innerText = `Game over! Your score: ${this.score}`;

            return true;
        } else {
            return false;
        }
    };

};

module.exports = Game;