
function RandomPosGenerator() {
    /* those are used for generating random free positions */
    var freePosition = [0, 1, 2, 3, 4, 5, 6 ,7 ,8, 9, 10, 11, 12, 13, 14, 15];
    var freePosCnt = 16;

    this.generateRandomFreePosition = function () {
        if (freePosCnt >= 1) {
            var pick = Math.floor(Math.random() * freePosCnt);
            return freePosition[pick];
        } else {
            console.log("No more free positions!");
            return -1;
        }
    };

    this.insertFreePosition = function (pos) {
        freePosition[freePosCnt++] = pos;
        //console.log("Free position added: " + pos);
    };

    this.removeFreePosition = function (pos) {
        /* search the index of that position */
        var posIndex = undefined;
        for (var i = 0; i < freePosCnt; i++) {
            if (freePosition[i] === pos) {
                posIndex = i;
                break;
            }
        }

        /* exclude position */
        if (posIndex !== undefined) {
            freePosition[posIndex] = freePosition[freePosCnt - 1];
            freePosCnt--;
            //console.log("Free position RESERVED:", pos);
        } else {
            console.log("Can't find position: " + pos);
        }
    };
}


