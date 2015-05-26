$(document).ready( function () {
    /* some initial variables*/
    var divMatrix = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
    var divCnt = 0;

    var positionGenerator = new RandomPosGenerator();

    /*
    for (var i = 0; i < 16; i++) {
        var randPos = positionGenerator.generateRandomFreePosition();
        positionGenerator.removeFreePosition(randPos);
        console.log(randPos);
    }*/

    var spawnNewDiv = function () {
        var randPos = positionGenerator.generateRandomFreePosition();
        positionGenerator.removeFreePosition(randPos);
        var division = new Division(randPos);

        /* add division to matrix */
        divMatrix[division.y][division.x] = division; // add object to game grid
        divCnt++;
        /* set division state to visible */
        division.setVisible(true);
    };

    for (var i = 0; i < 2; i++){
        spawnNewDiv();
    }


    var collideUp = function () {
        console.log("CollideUp was called.");
        var thereIsAction = false;

        for (var column = 0; column < 4; column++) {
            /* for each column of the matrix */
            for (var line = 1; line < 4; line++) {
                /* for each line of the current column */
                var subjectDiv = divMatrix[line][column];

                if (subjectDiv !== 0) {
                    /* go and detect something to do upwards */
                    var lastFreeY = -1;
                    var y, collided = false;

                    for (y = line-1; y >= 0; y--) {
                        var targetDiv = divMatrix[y][column];

                        if (targetDiv !== 0) {
                            if (targetDiv.value === subjectDiv.value) {
                                subjectDiv.collideWith(targetDiv, subjectDiv, divMatrix, positionGenerator);
                                thereIsAction = true;
                                collided = true;
                            } else {
                                break;
                            }
                        } else {
                            lastFreeY = y;
                        }
                    }
                    if (lastFreeY >= 0 && !collided) {
                        thereIsAction = true;
                        subjectDiv.moveToEmptyCell(lastFreeY, column, subjectDiv, divMatrix, positionGenerator);
                    }
                }
            }
        }

        if (thereIsAction)
            setTimeout(spawnNewDiv, 200);
    };

    var collideRight = function () {
        console.log("CollideRight was called.");
        var thereIsAction = false;

        for (var line = 0; line <= 3; line++) {
            /* for each column of the matrix */
            for (var column = 2; column >= 0; column--) {
                /* for each line of the current column */
                var subjectDiv = divMatrix[line][column];

                if (subjectDiv !== 0) {
                    /* go and detect something to do leftwards */
                    var lastFreeX = -1;
                    var x, collided = false;

                    for (x = column + 1; x <= 3; x++) {
                        var targetDiv = divMatrix[line][x];

                        if (targetDiv !== 0) {
                            if (targetDiv.value === subjectDiv.value) {
                                subjectDiv.collideWith(targetDiv, subjectDiv, divMatrix, positionGenerator);
                                thereIsAction = true;
                                collided = true;
                            } else {
                                break;
                            }
                        } else {
                            lastFreeX = x;
                        }
                    }
                    if (lastFreeX >= 0 && !collided) {
                        thereIsAction = true;
                        subjectDiv.moveToEmptyCell(line, lastFreeX, subjectDiv, divMatrix, positionGenerator);
                    }
                }
            }
        }
        if (thereIsAction)
            setTimeout(spawnNewDiv, 200);
    };

    var collideLeft = function () {
        console.log("CollideLeft was called.");
        var thereIsAction = false;

        for (var line = 0; line <= 3; line++) {
            /* for each column of the matrix */
            for (var column = 1; column <= 3; column++) {
                /* for each line of the current column */
                var subjectDiv = divMatrix[line][column];

                if (subjectDiv !== 0) {
                    /* go and detect something to do leftwards */
                    var lastFreeX = -1;
                    var x, collided = false;

                    for (x = column - 1; x >= 0; x--) {
                        var targetDiv = divMatrix[line][x];

                        if (targetDiv !== 0) {
                            if (targetDiv.value === subjectDiv.value) {
                                subjectDiv.collideWith(targetDiv, subjectDiv, divMatrix, positionGenerator);
                                thereIsAction = true;
                                collided = true;
                            } else {
                                break;
                            }
                        } else {
                            lastFreeX = x;
                        }
                    }
                    if (lastFreeX >= 0 && !collided) {
                        thereIsAction = true;
                        subjectDiv.moveToEmptyCell(line, lastFreeX, subjectDiv, divMatrix, positionGenerator);

                    }
                }
            }
        }
        if (thereIsAction)
            setTimeout(spawnNewDiv, 200);
    };

    var collideDown = function () {
        console.log("CollideDown was called.");
        var thereIsAction = false;

        for (var column = 0; column <= 3; column++) {
            /* for each column of the matrix */
            for (var line = 2; line >= 0; line--) {
                /* for each line of the current column */
                var subjectDiv = divMatrix[line][column];

                if (subjectDiv !== 0) {
                    /* go and detect something to do downwards */
                    var lastFreeY = -1;
                    var y, collided = false;

                    for (y = line + 1; y <= 3; y++) {
                        var targetDiv = divMatrix[y][column];

                        if (targetDiv !== 0) {
                            if (targetDiv.value === subjectDiv.value) {
                                subjectDiv.collideWith(targetDiv, subjectDiv, divMatrix, positionGenerator);
                                thereIsAction = true;
                                collided = true;
                            } else {
                                break;
                            }
                        } else {
                            lastFreeY = y;
                        }
                    }
                    if (lastFreeY >= 0 && !collided) {
                        thereIsAction = true;
                        subjectDiv.moveToEmptyCell(lastFreeY, column, subjectDiv, divMatrix, positionGenerator);
                    }
                }
            }
        }
        if (thereIsAction)
            setTimeout(spawnNewDiv, 200);
    };



    /* MAGIC STARTS DOWN HERE */
    $(document).keypress(function (key) {
        var ascii = key.which;

        if (ascii === 87 || ascii === 119 || ascii === 38) {
            /* 'W' or 'w' or 'up arrow' pressed */
            collideUp();
        } else if (ascii === 65 || ascii === 97 || ascii === 37) {
            /* 'A' or 'a' or 'left arrow' pressed */
            collideLeft();
        } else if (ascii === 83 || ascii === 115 || ascii === 40) {
            /* 'S' or 's' or 'down arrow' pressed */
            collideDown();
        } else if (ascii === 68 || ascii === 100 || ascii === 39) {
            /* 'D' or 'd' or 'right arrow' pressed */
            collideRight();
        }

        key.preventDefault();
    });

});