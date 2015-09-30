function UI(container) {

    // This will be updated upon response and by the user
    var data;

    var scriptEndpoint = 'https://script.google.com/macros/s/AKfycbztgTxGYXDaq-wzDna_qUgAuGYY8I--7gDpISJXP7ZOOL8dmKQ/exec';

    // A successful response from the form handler --
    // excepts a name, RSVP (true, false, or undefined),
    // and a party (named or +1)
    function showForm(response) {

        console.log("showing form", response);

        var name = response.name,
            party = response.party,
            rsvp = response.rsvp,
            submitter = response.submitter,
            form = container.find('form');

        // set data, passed through from Gsheet response
        data = response;

        function formHasFaded() {

            form.remove();

            var greetings = $('<h2>Hi ' + name.split(' ')[0] + '!</h2>').hide();
            container.prepend(greetings.fadeIn());

            // from here what happens depends on the status of the RSVP
            if ( rsvp === true || rsvp === false ) {
                return ( response.name === response.submitter ) ?
                    hasRsvped(response) :
                    hasBeenRsvped(response);
            }

            return hasYetToRsvp(response);
        }

        form.fadeOut(formHasFaded);
    };

        // The visitor has not RSVPed, and has not been RSVPed by anyone
        // in their party. Prompt them to RSVP for themselves and, if
        // applicable, for anyone else in their party.
        function hasYetToRsvp(response) {

            var attending = $('<input type="radio" name="attending" id="attending-yes" value="1">'),
                notAttending = $('<input type="radio" name="attending" id="attending-no" value="0">');
            container.append(attending).append(notAttending);
            attending.after('<label for="attending-yes">Attending</label><br>');
            notAttending.after('<label for="attending-no">Not Attending</label>');

            // note that this gets called from a jQuery object,
            // so reference this.val() for the radio button's value inside
            function updateRsvp(response) {
                data.rsvp = Boolean(parseInt(this.val()));
                data.submitter = response.name;
            }

            attending.change(updateRsvp.bind(attending, response));
            notAttending.change(updateRsvp.bind(notAttending, response));

            var member, rsvp;

            if ( response.party ) {
                for ( member in response.party ) {
                    rsvp = response.party[member];
                    // plus ones
                    if ( member === '1' ) {
                        console.log('you got a plus one');
                    // named party members
                    } else {
                        console.log('you got named party members');
                    }
                }
            }
        }

        function hasRsvped(response) {
            console.log('has rsvped');
        }

        function hasBeenRsvped(response) {
            console.log('has been rsvped');
        }

    // An error from the form handler.
    // Prompt the user to enter their name again.
    function showError(response) {
        console.log('showing error', response);
    }

    function submitRsvp() {
        $.ajax({
            url: scriptEndpoint,
            type: 'POST',
            data: data,
            success: function(response) {
                console.log(response);
            }
        });
    }

    return {
        showForm: showForm,
        showError: showError
    };
}

module.exports = UI;
