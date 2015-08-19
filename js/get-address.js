(function($) {

    // should be a URL param coming in from MailChimp
    var key = gup('key');

    $('body').addClass(key ? 'has-key' : 'no-key');

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
        originalSubmitText = submitButton.val(),
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

    (function doneLoading() {
        var saveGraphic;
        if ( !key ) {
            saveGraphic = $('img.no-key.lazy-load');
            if ( saveGraphic[0].complete ) {
                return hub.trigger('loaded');
            }
            saveGraphic.load(function() {
                hub.trigger('loaded');
            });
        }
    })();

    function parseResponse(data, cb) {

        var cells = data.feed.entry;
        cells.forEach(parseCell);
        cb();
    }

    function retrieveData(cb) {
        var timeout = 15000,
            start = 0,
            errorShown = false;

        // if no response after 15 seconds, show loading error
        (function increment() {
            start++;
            if ( start >= timeout && !errorShown ) {
                return showLoadingError();
            } else if ( !errorShown ) {
                setTimeout(increment, 1000);
            }
        })();

        function showLoadingError() {

            errorShown = true;

            var errorMessage = "<p>Oops! There was an error loading this page. Try refreshing, but if that doesn't work, you can always email us your address at <a href='mailto:scott.p.donaldson@gmail.com'>scott.p.donaldson@gmail.com</a>.</p>";

            hub.trigger('loaded');

            greetings.html(errorMessage);
            greetingsContainer.find('form').hide();
            greetingsContainer.animate({
                opacity: 1
            }, 1000);
        }

        function loadingSuccess(data) {
            // no longer need to show loading anim
            hub.trigger('loaded');
            parseResponse(data, cb);
        }

        $.ajax({
            url: buildURL(),
            success: function(data) {
                if ( gup('error') ) return showLoadingError();
                loadingSuccess(data);
            },
            error: showLoadingError
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
            greeting = '';

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

        greeting += '<span class="names">Hi ' + showNames + '!</span>';
        greeting += '<br>';

        if ( item.address ) {
            greeting += '<span class="please">You already sent us your address! But if you want to edit it, you can do&nbsp;that&nbsp;here:</span>';
            addressInput.val(item.address);
        } else {
            greeting += '<span class="please">Please let us know where we should send your invite:</span>';
        }

        greetings.html(greeting);
        greetingsContainer.animate({
            opacity: 1
        }, 1000);
    }

    function showThanks() {
        form.add(greetings).fadeOut(function() {
            thanks.fadeIn();
        });
    }

    function postData(data) {
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbz9nlUbYGAJYwQNsdmuKc7uqNyh5fNEL2qQ1qm67czt2th7RkJu/exec',
            type: 'POST',
            // async: false,
            data: data,
            success: showThanks,
            complete: showThanks
        });
    }

    function showNoAddressError() {
        addressInput.addClass('error');
        submitButton.val(originalSubmitText);
        noAddress.fadeIn();
    }

    function hideNoAddressError() {
        addressInput.removeClass('error');
        noAddress.fadeOut();
    }

    function submit(e) {

        e.preventDefault();

        var col,
            addressCol,
            data = {};

        submitButton.val('...');

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

    if ( !!key ) retrieveData(findMatch);
    addressInput.on('keyup', hideNoAddressError);
    addressInput.on('focus', function() {
        $('html, body').animate({
            scrollTop: addressInput.offset().top - 20
        })
    });

    form.on('submit', submit);

})(jQuery);
