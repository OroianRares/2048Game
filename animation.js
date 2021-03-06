$(document).ready( function ()
{
    /* some initial variables*/
    var gameState = new GameState();
    var randomPosGenerator = new RandomPosGenerator();
    var functionCallsQueue = [];

    var announceGameOver = function () {
        console.log("GAME OVER");
        gameState.setGameOver(true);

        var divMatrix = gameState.getDivMatrix();
        divMatrix[1][0].$div.text('G'); divMatrix[1][0].$div.attr('class', 'gameOver');
        divMatrix[1][1].$div.text('A'); divMatrix[1][1].$div.attr('class', 'gameOver');
        divMatrix[1][2].$div.text('M'); divMatrix[1][2].$div.attr('class', 'gameOver');
        divMatrix[1][3].$div.text('E'); divMatrix[1][3].$div.attr('class', 'gameOver');

        divMatrix[2][0].$div.text('O'); divMatrix[2][0].$div.attr('class', 'gameOver');
        divMatrix[2][1].$div.text('V'); divMatrix[2][1].$div.attr('class', 'gameOver');
        divMatrix[2][2].$div.text('E'); divMatrix[2][2].$div.attr('class', 'gameOver');
        divMatrix[2][3].$div.text('R'); divMatrix[2][3].$div.attr('class', 'gameOver');

        comfirm("The game is over, your score is: " + gameState.getScore());
    };

    var spawnNewDiv = function () {
        var randPos = randomPosGenerator.generateRandomFreePosition();
        randomPosGenerator.removeFreePosition(randPos);

        if (randPos >= 0) {
            var division = new Division(randPos);
            gameState.addDivToMatrixCoords(division, division.x, division.y); // add object to game grid
            division.setVisible(true); // show division
        } else {
            announceGameOver();
        }
    };

    var executeEnqueuedFunction = function () {
        var func = functionCallsQueue.shift();
        if (func !== undefined && !gameState.getGameOver())
            func();
            $('#ScoreValue').text("  " + gameState.getScore());
    };

    window.setInterval(executeEnqueuedFunction, 230);

    var collideUp = function () {
        console.log("CollideUp was called.");
        gameState.setThereIsAction(false);

        for (var column = 0; column < 4; column++) {
            /* for each column of the matrix */
            for (var line = 1; line < 4; line++) {
                /* for each line of the current column */
                var subjectDiv = gameState.getDivFromMatrixCoords(column, line);

                if (subjectDiv !== 0) {
                    /* go and detect something to do upwards */
                    var lastFreeY = -1;
                    var y, collided = false;

                    for (y = line-1; y >= 0; y--) {
                        var targetDiv = gameState.getDivFromMatrixCoords(column, y);

                        if (targetDiv !== 0) {
                            if (targetDiv.value === subjectDiv.value) {
                                subjectDiv.collideWith(targetDiv, subjectDiv, gameState, randomPosGenerator);
                                collided = true;
                            } else {
                                break;
                            }
                        } else {
                            lastFreeY = y;
                        }
                    }
                    if (lastFreeY >= 0 && !collided)
                        subjectDiv.moveToEmptyCell(lastFreeY, column, subjectDiv, gameState, randomPosGenerator);
                }
            }
        }

        if (gameState.getThereIsAction())
            setTimeout(spawnNewDiv, 200);
        else if (gameState.getDivCnt() === 16)
            announceGameOver();

        gameState.setThereIsAction(false);
    };

    var collideRight = function () {
        console.log("CollideRight was called.");
        gameState.setThereIsAction(false);

        for (var line = 0; line <= 3; line++) {
            /* for each column of the matrix */
            for (var column = 2; column >= 0; column--) {
                /* for each line of the current column */
                var subjectDiv = gameState.getDivFromMatrixCoords(column, line);

                if (subjectDiv !== 0) {
                    /* go and detect something to do leftwards */
                    var lastFreeX = -1;
                    var x, collided = false;

                    for (x = column + 1; x <= 3; x++) {
                        var targetDiv = gameState.getDivFromMatrixCoords(x, line);

                        if (targetDiv !== 0) {
                            if (targetDiv.value === subjectDiv.value) {
                                subjectDiv.collideWith(targetDiv, subjectDiv, gameState, randomPosGenerator);
                                collided = true;
                            } else {
                                break;
                            }
                        } else {
                            lastFreeX = x;
                        }
                    }
                    if (lastFreeX >= 0 && !collided)
                        subjectDiv.moveToEmptyCell(line, lastFreeX, subjectDiv, gameState, randomPosGenerator);
                }
            }
        }
        if (gameState.getThereIsAction())
            setTimeout(spawnNewDiv, 200);
        else if (gameState.getDivCnt() === 16)
            announceGameOver();

        gameState.setThereIsAction(false);
    };

    var collideLeft = function () {
        console.log("CollideLeft was called.");
        gameState.setThereIsAction(false);

        for (var line = 0; line <= 3; line++) {
            /* for each column of the matrix */
            for (var column = 1; column <= 3; column++) {
                /* for each line of the current column */
                var subjectDiv = gameState.getDivFromMatrixCoords(column, line);

                if (subjectDiv !== 0) {
                    /* go and detect something to do leftwards */
                    var lastFreeX = -1;
                    var x, collided = false;

                    for (x = column - 1; x >= 0; x--) {
                        var targetDiv = gameState.getDivFromMatrixCoords(x, line);

                        if (targetDiv !== 0) {
                            if (targetDiv.value === subjectDiv.value) {
                                subjectDiv.collideWith(targetDiv, subjectDiv, gameState, randomPosGenerator);
                                collided = true;
                            } else {
                                break;
                            }
                        } else {
                            lastFreeX = x;
                        }
                    }
                    if (lastFreeX >= 0 && !collided)
                        subjectDiv.moveToEmptyCell(line, lastFreeX, subjectDiv, gameState, randomPosGenerator);
                }
            }
        }
        if (gameState.getThereIsAction())
            setTimeout(spawnNewDiv, 200);
        else if (gameState.getDivCnt() === 16)
            announceGameOver();

        gameState.setThereIsAction(false);
    };

    var collideDown = function () {
        console.log("CollideDown was called.");
        gameState.setThereIsAction(false);

        for (var column = 0; column <= 3; column++) {
            /* for each column of the matrix */
            for (var line = 2; line >= 0; line--) {
                /* for each line of the current column */
                var subjectDiv = gameState.getDivFromMatrixCoords(column, line);

                if (subjectDiv !== 0) {
                    /* go and detect something to do downwards */
                    var lastFreeY = -1;
                    var y, collided = false;

                    for (y = line + 1; y <= 3; y++) {
                        var targetDiv = gameState.getDivFromMatrixCoords(column, y);

                        if (targetDiv !== 0) {
                            if (targetDiv.value === subjectDiv.value) {
                                subjectDiv.collideWith(targetDiv, subjectDiv, gameState, randomPosGenerator);
                                collided = true;
                            } else {
                                break;
                            }
                        } else {
                            lastFreeY = y;
                        }
                    }
                    if (lastFreeY >= 0 && !collided)
                        subjectDiv.moveToEmptyCell(lastFreeY, column, subjectDiv, gameState, randomPosGenerator);
                }
            }
        }
        if (gameState.getThereIsAction())
            setTimeout(spawnNewDiv, 200);
        else if (gameState.getDivCnt() === 16)
            announceGameOver();
    };



    /* KEY DETECTION */
    $(document).keypress(function (key) {
        if (!gameState.getGameOver()) {
            var ascii = key.keyCode;

            if (ascii === 87 || ascii === 119 || ascii === 38) {
                /* 'W' or 'w' or 'up arrow' pressed */
                functionCallsQueue.push(collideUp);

            } else if (ascii === 65 || ascii === 97 || ascii === 37) {
                /* 'A' or 'a' or 'left arrow' pressed */
                functionCallsQueue.push(collideLeft);
            } else if (ascii === 83 || ascii === 115 || ascii === 40) {
                /* 'S' or 's' or 'down arrow' pressed */
                functionCallsQueue.push(collideDown);
            } else if (ascii === 68 || ascii === 100 || ascii === 39) {
                /* 'D' or 'd' or 'right arrow' pressed */
                functionCallsQueue.push(collideRight);
            }
            console.log(gameState.getDivCnt());
            key.preventDefault();
        }
    });


    /* INITIAL GAME STATE LOADER */
    for (var i = 0; i < 2; i++){
        spawnNewDiv();
    }
});