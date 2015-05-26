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
    this.doubleValue = function () {
        this.value *= 2;
        this.$div.text(this.value); // update jquery object
        this.$div.attr('class',"activeDiv" + this.value);
    };

    this.moveToEmptyCell = function (y, x) {
        console.log("MoveToEmptyCell call.");
        /* here goes the fluffy stuff (animation) */
        var dx = (x - this.x) * (divWidth + tableBorder / 2);
        var dy = (y - this.y) * (divHeight + tableBorder / 2);
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

    this.collideWith = function (destination) {
        console.log("Collision call between " + this.locationID + " and " + destination.locationID);
        /* here goes the fluffy stuff (animation) */
        var x = destination.x;
        var y = destination.y;
        var dx = (x - this.x) * (divWidth + tableBorder / 2);
        var dy = (y - this.y) * (divHeight + tableBorder / 2);
        var obj = this;

        obj.$div.animate({left: "+=" + dx + "px", top: "+=" + dy + "px"}, 'fast',
            function () {
                /* relocate HTML tag into DOM */
                obj.$div.remove();

                obj.locationID = "#" + y + x;
                obj.$div = $('<div class="activeDiv' + obj.value + '" ID=' +
                    obj.locationID + '>' + obj.value + '</div>');

                $(obj.locationID).append(obj.$div);

                /* actual value of the source doubles because of the merge */
                obj.doubleValue();
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
