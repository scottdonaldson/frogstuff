var util = require('./util.js'),
    ui = require('./rsvp-ui.js');

function Handler($form) {

    var nameInput = $form.find('[name="your-name"]'),
        sheet = false,
        callbacks = {};

    function submit(e) {
        e.preventDefault();
        var response = checkName(sheet);
        trigger(response.type, response);
    }

    function updateWith(newSheet) {
        sheet = newSheet;
    }

    function on(which, cb) {
        if ( !callbacks.hasOwnProperty(which) ) {
            callbacks[which] = cb;
        }
    }

    function trigger(which) {
        var args = Array.prototype.slice.call(arguments);
        args = args.slice(1);
        return callbacks[which].apply(null, args);
    }

    // expects the name to be exactly as it is in the sheet
    function indexFromName(name) {
        var i = 0;
        while ( i < getValues('name').length ) {
            if ( getValue('name', i) === name ) return i;
            i++;
        }
        return false;
    }

    function getValue(col, index) {
        col = col.toUpperCase();
        return sheet[col].data[index];
    }

    function getValues(col) {
        col = col.toUpperCase();
        return sheet[col].data;
    }

    function checkName(sheet) {

        var name,
            altCopy,
            i = 0;

        name = nameInput.val();
        name = util.ignoreNonLetter(name);

        if ( name === '' ) {
            return {
                type: 'empty'
            };
        }

        function success(i) {
            var response = {
                type: 'success',
                name: getValue('name', i),
                party: {},
                rsvp: getValue('rsvp', i),
                submitter: getValue('submitter', i),
                nameCol: sheet['NAME'].col,
                rsvpCol: sheet['RSVP'].col,
                submitterCol: sheet['SUBMITTER'].col
            };

            response.rsvp = util.affirmToBool(response.rsvp);

            // get RSVPs for all members in this party
            (getValue('party', i) || '').split(', ').forEach(function(member) {
                if ( member ) {
                    var memberIndex = indexFromName(member);
                    response.party[member] = getValue('rsvp', memberIndex);
                    response.party[member] = util.affirmToBool(response.party[member]);
                }
            });

            return response;
        }

        if ( sheet ) {

            // check for name
            while ( i < getValues('name').length ) {
                if ( name === util.ignoreNonLetter(getValue('name', i)) ) {
                    // yay, we found it
                    return success(i);
                }
                i++;
            }

            // if not found, check in alt names
            i = 0;
            while ( i < getValues('alt_name').length ) {

                // coerce the alt names to just lowercase letters
                altCopy = getValue('alt_name', i) || '';
                altCopy = altCopy.split(', ').map(function(name) {
                    return util.ignoreNonLetter(name);
                });

                if ( altCopy.indexOf(name) > -1 ) {
                    // yay, we found it
                    return success(i);
                }
                i++;
            }

            // if still not found, this person is an imposter!
            return {
                type: 'error',
                input: nameInput
            };

        } else {
            console.log('sheet not ready yet...');
            setTimeout(checkName, 250);
        }
    }

    $form.on('submit', submit);

    return {
        submit: submit,
        checkName: checkName,
        updateWith: updateWith,
        on: on,
        trigger: trigger
    };
}

module.exports = Handler;
