(function($) {

    // should be a URL param coming in from MailChimp
    var key = gup('key');

    // this will hold the parsed data
    var sheet = [];

    // sheet config -- set in parseResponse()
    var columns = {},
        columnKeys = ['KEY', 'NAME', 'EMAIL', 'ADDRESS'];

    // form
    var greetingsContainer = $('#greetings-container'),
        greetings = $('#greetings'),
        form = $('form'),
        rowInput = $('#row'),
        addressInput = $('#address'),
        submitButton = $('#submit'),
        noAddress = $('#no-address'),
        thanks = $('#thanks');

    function parseCell(cell) {

        var content = cell.content.$t,
            column = cell.title.$t.replace(/\d+/, ''),
            row = +cell.title.$t.replace(/[A-Z]/, ''),
            columnType = columns[column];

        // if it's a key, return and configure columns
        if ( columnKeys.indexOf(content) > -1 ) {
            columns[column] = content.toLowerCase();
            return;
        }

        // for names and emails,
        // format content as array with comma delimiter
        if ( columnType === 'name' || columnType === 'email' ) {
            content = content.split(', ');
        }

        if ( row ) {
            // if no row exists in the sheet data, create one
            if ( !sheet[row] ) sheet[row] = {};

            // add data to sheet
            sheet[row][columnType] = content;

            // sheet[row].column = column;
            sheet[row].row = row;
        }
    }

    function parseResponse(data, cb) {
        var cells = data.feed.entry;
        cells.forEach(parseCell);
        cb();
    }

    function retrieveData(cb) {
        $.ajax({
            url: buildURL(),
            success: function(data) {
                parseResponse(data, cb);
            }
        });
    }

    function ignoreNonLetter(str) {
        return str ? str.replace(/[^a-zA-Z]/g, '').toLowerCase() : '';
    }

    function findMatch() {

        var i = 0, item;

        while ( i < sheet.length ) {

            if ( sheet[i] ) {

                item = sheet[i];

                if ( item.key === key ) {

                    // set form data
                    rowInput.val(item.row);

                    return showGreeting(item);
                }
            }
            i++;
        }
    }

    function showGreeting(item) {

        var names = item.name,
            num = names.length,
            showNames = '',
            greeting = 'Hi ';

        names.forEach(function(name, i) {
            name = name.split(' ')[0];
            if ( i === 0 ) {
                showNames += name;
            } else if ( names.length === 2 ) {
                showNames += ' and ' + name;
            } else if ( i === names.length - 1 ) {
                showNames += ', and ' + name;
            } else {
                showNames += ', ' + name;
            }
        });

        greeting += '<span class="names">' + showNames + '!</span>';
        greeting += '<br>';
        greeting += '<span class="please">Please let us know where we should send your invite:</span>';

        greetings.html(greeting);
        greetingsContainer.fadeIn(1000);
    }

    function showSubmit() {
        console.log('showing submit');
        /* var lines = addressInput.val().split('\n')
        if ( lines.length > 1 && lines[1] !== '' ) {
            submitButton.fadeIn();
        } else {
            submitButton.fadeOut();
        } */
    }

    function postData(data) {
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbz9nlUbYGAJYwQNsdmuKc7uqNyh5fNEL2qQ1qm67czt2th7RkJu/exec',
            type: 'POST',
            data: data,
            success: function(data) {
                form.add(greetings).fadeOut(function() {
                    thanks.fadeIn();
                });
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    function showNoAddressError() {
        noAddress.fadeIn();
    }

    function hideNoAddressError() {
        noAddress.fadeOut();
    }

    function submit(e) {

        e.preventDefault();

        var col,
            addressCol,
            data = {};

        // get column of ADDRESS
        for ( col in columns ) {
            if ( columns[col] === 'address' ) addressCol = col;
        }

        data.row = rowInput.val();
        data.addressCol = addressCol;
        data.address = addressInput.val();

        if ( data.row && data.address ) {
            postData(data);
        } else {
            showNoAddressError();
        }
    }

    retrieveData(findMatch);
    addressInput.on('keyup', hideNoAddressError);
    form.on('submit', submit);

})(jQuery);
