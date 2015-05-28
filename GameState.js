function GameState () {
    var divMatrix = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
    var divCnt = 0;
    var gameOver = false;
    var thereIsAction = false;

    this.addDivToMatrixCoords = function (divisionObj, x, y) {
        if (x >= 0 && x < 4 && y >= 0 && y < 4) {
            divMatrix[y][x] = divisionObj;
            divCnt++;
        } else {
            console.log("Invalid coordinates. x=" + x + " y=" + y);
        }
    };

    this.removeDivFromMatrixCoords = function (x, y) {
        if (x >= 0 && x < 4 && y >= 0 && y < 4) {
            divMatrix[y][x] = 0;
            divCnt--;
        } else {
            console.log("Invalid coordinates. x=" + x + " y=" + y);
        }
    };



    this.setGameOver = function (boolValue) {
        gameOver = boolValue;
    };

    this.setThereIsAction = function (boolValue) {
        thereIsAction = boolValue;
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
    }
}