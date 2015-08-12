(function($) {

    var base = '',
        key1 = '1aS5R3rKitHu2WBDJvj66',
        key2 = 'UGRg2MgKwyjlowYZPAerUas',
        sheet = [];

    // sheet config -- set in parseResponse()
    var columns = {},
        columnKeys = ['NAME', 'EMAIL', 'PREFERRED NAME', 'PREFERRED EMAIL', 'PREFERRED ADDRESS'];

    // form
    var form = $('form'),
        nameInput = $('#name'),
        emailInput = $('#email'),
        columnInput = $('#column'),
        rowInput = $('#row'),
        addressInput = $('#address');

    function buildURL(key) {
        return 'https://spreadsheets.google.com/feeds/cells/' + key1 + key2 + '/1/public/basic?alt=json';
    }

    function parseCell(cell) {

        var content = cell.content.$t,
            column = cell.title.$t.replace(/\d+/, ''),
            row = +cell.title.$t.replace(/[AB]/, ''),
            columnType = columns[column];

        // if it's a key, return and configure columns
        if ( columnKeys.indexOf(content) > -1 ) {
            columns[column] = content.toLowerCase();
            return;
        }

        // format content as array with comma delimiter
        content = content.split(', ');

        if ( row ) {
            // if no row exists in the sheet data, create one
            if ( !sheet[row] ) sheet[row] = {};

            // add data to sheet
            sheet[row][columnType] = content;
            sheet[row].column = column;
            sheet[row].row = row;
        }
    }

    function parseResponse(data) {
        var cells = data.feed.entry;
        cells.forEach(parseCell);
        console.log(columns);
        console.log(sheet);
    }

    function retrieveData() {
        $.ajax({
            url: buildURL(key),
            success: parseResponse
        });
    }

    function ignoreNonLetter(str) {
        return str ? str.replace(/[^a-zA-Z]/g, '').toLowerCase() : '';
    }

    function findMatches($input) {

        var test = $input.val(),
            matches = [],
            match;

        // ignore punctuation, capitalization
        test = ignoreNonLetter(test);

        sheet.forEach(function(item) {
            item.name.forEach(function(name) {
                if ( ignoreNonLetter(name).match(test) ) matches.push(item);
            });
        });

        // if we get a match, set data
        if ( matches.length === 1 ) {
            match = matches[0];
            rowInput.val(match.row);
        }
    }

    function postData(data) {
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbwPhCUjpoSXwe1dOng2htVzbwGOJKjDVuebnUloVL6ORGXpstA9/exec',
            type: 'POST',
            data: data,
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    function submit(e) {

        e.preventDefault();

        var col,
            nameCol,
            emailCol,
            addressCol,
            data = {};

        // get column of ADDRESS
        for ( col in columns ) {
            if ( columns[col] === 'preferred name' ) nameCol = col;
            if ( columns[col] === 'preferred email' ) emailCol = col;
            if ( columns[col] === 'preferred address' ) addressCol = col;
        }

        data.nameCol = nameCol;
        data.emailCol = emailCol;
        data.addressCol = addressCol;
        data.row = rowInput.val();

        data.name = nameInput.val();
        data.email = emailInput.val();
        data.address = addressInput.val();

        if ( data.row && data.address ) {

            postData(data);

        // no match but have a name, email, and address
        } else if ( data.name && data.email, data.address ) {

            // create a new row
            data.row = 'NEW';

            postData(data);

        } else {

        }
    }

    retrieveData();
    nameInput.on('keyup', findMatches.bind(null, nameInput));
    form.on('submit', submit);

})(jQuery);
