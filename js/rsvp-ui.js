var util = require('./util.js');

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

            // same as above, but party member's name include
            // via jQuery's .data() method
            function updatePartyMemberRsvp() {
                console.log(this);
                var member = this.data('member');
                data.party[member] = Boolean(parseInt(this.val()));
                console.log('updated', member, data);
            }

            attending.change(updateRsvp.bind(attending, response));
            notAttending.change(updateRsvp.bind(notAttending, response));

            var member, rsvp,
                memberContainer = $('<div class="members">'),
                party = [];

            memberContainer.prepend('<p>Your party:</p>');

            if ( Object.keys(response.party).length > 0 ) {
                for ( member in response.party ) {
                    rsvp = response.party[member];
                    // plus ones
                    if ( member === '1' ) {
                        // clear the existing "Your party:" text
                        memberContainer.html('<p>Would you like to RSVP for a plus one?</p>');
                    // named party members
                    } else {
                        
                        var node = $('<p>');
                        node.text(member + '. rsvp status: ' + rsvp);
                        memberContainer.append(node);

                        // if no RSVP yet, ask this member if they want to RSVP
                        if ( rsvp !== true && rsvp !== false ) {
                            var memberAttending = $('<input type="radio" name="attending-' + util.ignoreNonLetter(member) + '" id="attending-' + util.ignoreNonLetter(member) + '-yes" value="1">'),
                                memberNotAttending = $('<input type="radio" name="attending-' + util.ignoreNonLetter(member) + '" id="attending-' + util.ignoreNonLetter(member) + '-no" value="0">');

                            memberAttending
                                .data('member', member)
                                .change(updatePartyMemberRsvp.bind(memberAttending));
                            memberNotAttending
                                .data('member', member)
                                .change(updatePartyMemberRsvp.bind(memberNotAttending));

                            memberContainer.append(memberAttending);
                            memberContainer.append('<label for="attending-' + util.ignoreNonLetter(member) + 'yes">Attending</label><br>');
                            memberContainer.append(memberNotAttending);
                            memberContainer.append('<label for="attending-' + util.ignoreNonLetter(member) + 'no">Not Attending</label>');
                        }
                    }
                }

                container.append(memberContainer);
            }

            var submit = $('<input type="submit">');
            submit.click(function(e) {
                e.preventDefault();
                submitRsvp();
            });
            container.append('<br><br>');
            container.append(submit);
        }

        function hasRsvped(response) {
            container.append('<p>Your RSVP has been received!</p>');
            container.append('<p>If you need to change your RSVP, please email us as soon as possible to make sure it gets updated: <a href="mailto:scott.p.donaldson@gmail.com">scott.p.donaldson@gmail.com</a></p>');
        }

        function hasBeenRsvped(response) {
            var submitter = response.submitter.split(' ')[0];
            container.append('<p>Your RSVP has been submitted by ' + submitter + '.</p>');
            container.append('<p>If you need to change your RSVP, please email us (or ask ' + submitter + ' to email us) as soon as possible to make sure it gets updated: <a href="mailto:scott.p.donaldson@gmail.com">scott.p.donaldson@gmail.com</a></p>');
        }

    // An error from the form handler.
    // Prompt the user to enter their name again.
    function showError(response) {
        console.log('showing error', response);
    }

    function submitRsvp() {
        // stringify the party to be sent to the server
        data.party = JSON.stringify(data.party);
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
