let noop = () => {};

let parseResponse = (data, cb) => {

    let cells = data.feed.entry,
        sheet = {};

    let parseCell = (cell) => {

        let content = cell.content.$t,
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
    };

    cells.forEach(parseCell);
    if (cb) cb(sheet);
    return sheet;
};

// Automatically GETs data and stores it for retrieval
let gsheet = (url) => {
        
    let sheet = [];

    let success = (data) => {
        sheet = parseResponse(data);
    };

    let promise = $.ajax({
        url,
        success,
        error: (error) => {
            console.log(error);
        }
    });

    let ready = (cb) => {
        return promise.then(() => {
            if ( cb ) return cb();
            return this;
        });
    };

    let byKey = () => {

        let output = {};

        if ( sheet[1] ) {
            // assume keys are in the first row
            for ( let col in sheet[1] ) {
                output[sheet[1][col]] = {
                    col,
                    data: []
                };
            }
        }

        for ( let row in sheet ) {
            for ( let key in output ) {
                // get the column
                let col = output[key].col;
                // push value
                output[key].data.push( sheet[row][col] );
            }
        }

        // ignore the first row
        for ( let key in output ) {
            output[key].data = output[key].data.slice(1);
        }

        return output;
    };

    return {
        promise,
        ready,
        byKey
    };
}

export default gsheet;
