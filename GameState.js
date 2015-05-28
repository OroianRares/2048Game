function GameState () {
    var divMatrix = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
    var divCnt = 0;
    var gameOver = false;
    var thereIsAction = false;
    var score = 0;

    this.addToScore = function (valueToAdd) {
        score += valueToAdd;
    };

    this.addDivToMatrixCoords = function (divisionObj, x, y) {
        if (x >= 0 && x < 4 && y >= 0 && y < 4) {
            divMatrix[y][x] = divisionObj;
            divCnt++;
            return true;
        } else {
            console.log("Invalid coordinates. x=" + x + " y=" + y);
            return false;
        }
    };

    this.removeDivFromMatrixCoords = function (x, y) {
        if (x >= 0 && x < 4 && y >= 0 && y < 4) {
            divMatrix[y][x] = 0;
            divCnt--;
            return true;
        } else {
            console.log("Invalid coordinates. x=" + x + " y=" + y);
            return false;
        }
    };



    this.setGameOver = function (boolValue) {
        if (typeof boolValue === "boolean")
            gameOver = boolValue;
        else
            console.log("How fool do you think i am? " + boolValue + " is no boolean value!");

        return typeof boolValue === "boolean";
    };

    this.setThereIsAction = function (boolValue) {
        if (typeof boolValue === "boolean")
            thereIsAction = boolValue;
        else
            console.log("How fool do you think i am? " + boolValue + " is no boolean value!");

        return typeof boolValue === "boolean";
    };

    this.setDivCnt = function (value) {
        if (value >= 0)
            divCnt = value;
        else
            console.log("Invalid setDivCnt value: " + value);

        return value >= 0;
    };



    this.getDivMatrix = function () {
        return divMatrix;
    };

    this.getGameOver = function () {
        return gameOver;
    };

    this.getThereIsAction = function () {
        return thereIsAction;
    };

    this.getDivFromMatrixCoords = function (x, y) {
        if ((x >= 0 && (x-4) < 0) && (y >= 0 && (y-4) < 0)) {
            return divMatrix[y][x];
        } else {
            console.log("Invalid coordinates. x=" + x + " y=" + y);
            return 0;
        }
    };

    this.getDivCnt = function () {
        return divCnt;
    };

    this.getScore = function () {
        return score;
    };
}