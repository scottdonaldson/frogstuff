function noop() {}

function parseResponse(data, cb) {

    var cells = data.feed.entry,
        sheet = {};

    function parseCell(cell) {

        var content = cell.content.$t,
            column = cell.title.$t.replace(/\d+/, ''),
            row = +cell.title.$t.replace(/[A-Z]/, '');

        // gimme some bools
        if ( content === 'TRUE' ) content = true;
        if ( content === 'FALSE' ) content = false;

        if ( row ) {
            // if no row exists in the sheet data, create one
            if ( !sheet[row] ) sheet[row] = {};

            // add data to sheet
            sheet[row][column] = content;
        }
    }

    cells.forEach(parseCell);
    if (cb) cb(sheet);
    return sheet;
}

// Automatically GETs data and stores it for retrieval
var gsheet = function(url) {

    if ( !(this instanceof gsheet) ) return new gsheet(url);

    this.sheet = [];

    function success(data) {
        this.sheet = parseResponse(data);
    }

    var _this = this;
    this.promise = $.ajax({
        url: url,
        success: success.bind(_this),
        error: function(error) {
            console.log(error);
        }
    });
    return this;
};

gsheet.prototype.ready = function ready(cb) {
    var _this = this;
    return this.promise.then(function() {
        if ( cb ) return cb.call(_this, _this.sheet);
        return _this;
    });
};

gsheet.prototype.byKey = function byKey() {

    var sheet = this.sheet,
        output = {},
        key,
        row,
        col;

    if ( sheet[1] ) {
        // assume keys are in the first row
        for ( col in sheet[1] ) {
            output[sheet[1][col]] = {
                col: col,
                data: []
            };
        }
    }

    for ( row in sheet ) {
        for ( key in output ) {
            // get the column
            col = output[key].col;
            // push value
            output[key].data.push( sheet[row][col] );
        }
    }

    // ignore the first row
    for ( key in output ) {
        output[key].data = output[key].data.slice(1);
    }

    return output;
};

module.exports = gsheet;
