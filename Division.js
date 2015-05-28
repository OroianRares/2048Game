var divWidth = 0;
var divHeight = 0;
var tableBorder = 0;

$(document).ready( function () {
    /* some jQuery objects */
    var $backgroundDiv = $('.backgroundDiv');
    var $table = $('table');


    /* take some measurements*/
    divWidth = parseInt($backgroundDiv.css('width'));
    divHeight = parseInt($backgroundDiv.css('height'));
    tableBorder = parseInt($table.css('border')) + 1;


    console.log("divWidth: " + divWidth);
    console.log("divHeight: " + divHeight);
    console.log("tableBorder: " + tableBorder);
});



/* Constructor for an active division object */
function Division (position) {
    /* properties */
    this.value = 0; /* digit displayed - is set below */
    if (Math.random() < 0.5)
        this.value = 2;
    else
        this.value = 4;

    this.x = position % 4;
    this.y = Math.floor(position / 4);
    this.locationID = '#' + this.y + this.x;
    this.$div = $('<div class="activeDiv" ID=' + this.locationID + '>' + this.value + '</div>');



    /* methods */
    this.moveToEmptyCell = function (y, x, subjectDiv, gameState, positionGenerator) {
        console.log("MoveToEmptyCell call.");
        /* here goes the fluffy stuff (animation) */
        var dx = (x - this.x) * (divWidth + tableBorder / 2);
        var dy = (y - this.y) * (divHeight + tableBorder / 2);

        /* update game state */
        positionGenerator.removeFreePosition(y * 4 + x);
        positionGenerator.insertFreePosition(subjectDiv.y * 4 + subjectDiv.x);
        gameState.setThereIsAction(true);
        /* update divMatrix */
        gameState.addDivToMatrixCoords(subjectDiv, x, y);
        gameState.removeDivFromMatrixCoords(subjectDiv.x, subjectDiv.y);
        /* update subject */
        subjectDiv.x = x;
        subjectDiv.y = y;


        var obj = this;

        obj.$div.animate({left: "+=" + dx + "px", top: "+=" + dy + "px"}, 'fast',
            function () {
                /* relocate HTML tag into DOM */
                obj.$div.remove();

                obj.locationID = "#" + y + x;
                obj.$div = $('<div class="activeDiv' + obj.value + '" ID=' +
                    obj.locationID + '>' + obj.value + '</div>');
                $(obj.locationID).append(obj.$div);
            }
        );
        console.log("MoveToEmptyCell call resolved.");
    };



    this.collideWith = function (destination, subjectDiv, gameState, positionGenerator) {
        console.log("Collision call between " + this.locationID + " and " + destination.locationID);
        /* here goes the fluffy stuff (animation) */
        var x = destination.x;
        var y = destination.y;
        var dx = (x - this.x) * (divWidth + tableBorder / 2);
        var dy = (y - this.y) * (divHeight + tableBorder / 2);
        var obj = this;


        /* update game state */
        positionGenerator.insertFreePosition(subjectDiv.y * 4 + subjectDiv.x);
        gameState.setThereIsAction(true);
        /* update divMatrix */
        gameState.removeDivFromMatrixCoords(subjectDiv.x, subjectDiv.y);
        gameState.addDivToMatrixCoords(subjectDiv, destination.x, destination.y);
        /* update subject */
        subjectDiv.x = destination.x;
        subjectDiv.y = destination.y;


        obj.$div.animate({left: "+=" + dx + "px", top: "+=" + dy + "px"}, 'fast',
            function () {
                /* relocate HTML tag into DOM */
                obj.$div.remove();

                obj.locationID = "#" + y + x;
                obj.$div = $('<div class="activeDiv' + obj.value + '" ID=' +
                    obj.locationID + '>' + obj.value + '</div>');

                $(obj.locationID).append(obj.$div);

                /* actual value of the source doubles because of the merge */
                obj.value *= 2;
                obj.$div.text(obj.value); // update jquery object text
                obj.$div.attr('class',"activeDiv" + obj.value); // update jquery object class

                /* destination div disappears into the darkness */
                destination.setVisible(false);

                console.log("Collision resolved.");
            }
        );
    };

    this.setVisible = function (state) {
        if (state === true) {
            $(this.locationID).append(this.$div); // add the <div> tag to DOM
            this.$div.attr('class',"activeDiv" + this.value);
        } else {
            this.$div.remove(); // remove the <div> tag from DOM
        }
    };
}
