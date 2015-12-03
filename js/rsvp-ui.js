var React = require('react'),
    util = require('./util.js');

let UI = (container) => {

    // This will be updated upon response and by the user
    var data;

    var scriptEndpoint = 'https://script.google.com/macros/s/AKfycbztgTxGYXDaq-wzDna_qUgAuGYY8I--7gDpISJXP7ZOOL8dmKQ/exec';

    // A successful response from the form handler --
    // excepts a name, RSVP (true, false, or undefined),
    // and a party (named or +1)
    function showForm(response) {

        var name = response.name,
            party = response.party,
            rsvp = response.rsvp,
            submitter = response.submitter,
            form = container.find('form');

        // set data, passed through from Gsheet response
        data = response;

        function containerHasFaded() {

            form.remove();
            formError.remove();

            setTimeout(function formHasBeenRemoved() {
                var greetings = $('<h2>Hi ' + name.split(' ')[0] + '!</h2>');

                container.append(greetings);

                container.fadeIn();

                // from here what happens depends on the status of the RSVP
                if ( rsvp === true || rsvp === false ) {
                    return ( response.name === response.submitter ) ?
                        hasRsvped(response) :
                        hasBeenRsvped(response);
                }

                return hasYetToRsvp(response);
            }, 10);
        }

        container.fadeOut(containerHasFaded);
    };

    // The visitor has not RSVPed, and has not been RSVPed by anyone
    // in their party. Prompt them to RSVP for themselves and, if
    // applicable, for anyone else in their party.
    function hasYetToRsvp(response) {

        var question = $('<p>Well, here we are, popping the big question: will you be attending?</p>');
        container.append(question);

        var attending = $('<input type="radio" name="attending" id="attending-yes" value="1">'),
            notAttending = $('<input type="radio" name="attending" id="attending-no" value="0">');
        container.append(attending).append(notAttending);
        attending.after('<label for="attending-yes">Yes!</label><br>');
        notAttending.after('<label for="attending-no">No 😢</label>');

        // note that this gets called from a jQuery object,
        // so reference this.val() for the radio button's value inside
        function updateRsvp(response) {
            data.rsvp = Boolean(parseInt(this.val()));
            data.submitter = response.name;
        }

        // same as above, but party member's name include
        // via jQuery's .data() method
        function updatePartyMemberRsvp() {
            var member = this.data('member');
            data.party[member] = Boolean(parseInt(this.val()));
        }

        attending.change(updateRsvp.bind(attending, response));
        notAttending.change(updateRsvp.bind(notAttending, response));

        var member, rsvp,
            memberContainer = $('<div class="members">'),
            beforeMemberContainer,
            party = [],
            withoutRsvp = 0;

        memberContainer.prepend('<p>Your party:</p>');

        // if no plus one and no party members, response.party = {}
        // otherwise, keys are names (or '1' for plus one)
        if ( Object.keys(response.party).length > 0 ) {

            for ( member in response.party ) {

                rsvp = response.party[member];

                // plus ones
                if ( member === '1' ) {

                    // clear the existing "Your party:" text
                    memberContainer.html('');

                    // TODO: +1 logic
                    var plusOneContainer = $('<div>').hide(),
                        plusOneAttending = $('<input type="radio" name="attending-plusone" id="attending-plusone-yes" value="1">'),
                        plusOneNotAttending = $('<input type="radio" name="attending-plusone" id="attending-plusone-no" value="0">');

                    memberContainer
                        .append(plusOneContainer);
                    plusOneContainer
                        .append('<p>Would you like to RSVP for a plus one?</p>')
                        .append(plusOneAttending)
                        .append('<label for="attending-plusone-yes">Yes</label><br>')
                        .append(plusOneNotAttending)
                        .append('<label for="attending-plusone-no">No</label>');

                    var togglePlusOne = function() {
                        var memberIsAttending = Boolean(parseInt(this.value));
                        if ( memberIsAttending ) {
                            plusOneContainer.show();
                        } else {
                            plusOneContainer.hide();
                        }
                    }

                    attending.change(togglePlusOne);
                    notAttending.change(togglePlusOne);

                // named party members
                } else {

                    var memberNodeContainer = $('<div>').hide();

                    var node = $('<p>' + member + '</p>');

                    if ( rsvp === true ) {
                        node.append(' (Attending)');
                    } else if ( rsvp === false ) {
                        node.append(' (Not attending 😢)');
                    }

                    memberContainer.append(node);

                    // if no RSVP yet, ask this member if they want to RSVP
                    if ( rsvp !== true && rsvp !== false ) {

                        withoutRsvp++;

                        var memberAttending = $('<input type="radio" name="attending-' + util.ignoreNonLetter(member) + '" id="attending-' + util.ignoreNonLetter(member) + '-yes" value="1">'),
                            memberNotAttending = $('<input type="radio" name="attending-' + util.ignoreNonLetter(member) + '" id="attending-' + util.ignoreNonLetter(member) + '-no" value="0">');

                        memberAttending
                            .data('member', member)
                            .change(updatePartyMemberRsvp.bind(memberAttending));
                        memberNotAttending
                            .data('member', member)
                            .change(updatePartyMemberRsvp.bind(memberNotAttending));

                        memberContainer
                            .append(memberAttending)
                            .append('<label for="attending-' + util.ignoreNonLetter(member) + '-yes">Yes!</label><br>')
                            .append(memberNotAttending)
                            .append('<label for="attending-' + util.ignoreNonLetter(member) + '-no">No 😢</label>');
                    }
                }
            }

            if ( withoutRsvp > 0 ) {
                memberContainer.hide();
                beforeMemberContainer = $('<a href="#" class="rsvp-for-party">Would you like to RSVP for your party?</a>');
                beforeMemberContainer.on('click', function() {
                    $(this).fadeOut(function() {
                        memberContainer.fadeIn();
                    });
                });
            } else {
                memberContainer.show();
            }

            container.append(beforeMemberContainer);
            container.append(memberContainer);
        }

        var submit = $('<input type="submit" id="submit" value="Submit RSVP">');
        submit.click(function(e) {
            e.preventDefault();
            submitRsvp();
        });
        container.append('<br><br>');
        container.append(submit);
    }

    function hasRsvped(response) {
        rsvpText(response);
    }

    function hasBeenRsvped(response) {
        console.log('test');
        var submitter = response.submitter.split(' ')[0];
        rsvpText(response, submitter);
    }

    function rsvpText(response, submitter) {
        // slightly different texts depending on if the submitter
        // is the visitor or if someone else submitted the RSVP
        container.append('<p>Your RSVP ' + (response.rsvp === true ? 'to attend' : 'to sit this one out') + ' has been ' + ( submitter ? 'submitted by ' + submitter + '.' : ' received.' ) + '</p>');
        container.append('<p>If you need to change your RSVP, please email us ' + (submitter ? '(or ask ' + submitter + ' to email us)' : '' ) + ' as soon as possible to make sure it gets updated: <a href="mailto:scott.p.donaldson@gmail.com">scott.p.donaldson@gmail.com</a></p>');
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
                // TODO: show success message
                container.html('<h2>Success!</h2>');
            }
        });
    }

    return {
        showForm
    };
}

export default UI;