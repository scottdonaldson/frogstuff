var util = require('./util.js');

function UI(container) {

    // This will be updated upon response and by the user
    var data;

    var scriptEndpoint = 'https://script.google.com/macros/s/AKfycbztgTxGYXDaq-wzDna_qUgAuGYY8I--7gDpISJXP7ZOOL8dmKQ/exec';

    // error message that's shown in various scenarios
    var formError = $('#form-error');

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
        var submitter = response.submitter.split(' ')[0];
        rsvpText(response, submitter);
    }

    function rsvpText(response, submitter) {
        // slightly different texts depending on if the submitter
        // is the visitor or if someone else submitted the RSVP
        container.append('<p>Your RSVP ' + (response.rsvp === true ? 'to attend' : 'to sit this one out') + ' has been ' + ( submitter ? 'submitted by ' + submitter + '.' : ' received.' ) + '</p>');
        container.append('<p>If you need to change your RSVP, please email us ' + (submitter ? '(or ask ' + submitter + ' to email us)' : '' ) + ' as soon as possible to make sure it gets updated: <a href="mailto:scott.p.donaldson@gmail.com">scott.p.donaldson@gmail.com</a></p>');
    }

    // An error from the form handler.
    // Prompt the user to enter their name again.
    function showError(response) {
        var input = response.input;
        input.addClass('error');

        if ( formError.length === 0 || formError.data('tries') === 0 ) {

            // in case there was one already shown
            formError.fadeOut();

            formError = $('<div id="form-error">We couldn\'t find your name on the list. Did you spell it exactly as it was on your&nbsp;invitation?</div>').hide();
            formError.data('tries', 1);
            container.append(formError.fadeIn());

            input.on('change keyup paste blur', function() {
                $(this).removeClass('error');
            });

        } else if ( formError.data('tries') === 1 ) {

            formError.data('tries', 2);
            formError.fadeOut(function() {
                formError.html('Hmmm, still no luck. Will you humor us and try one more time? Spelling really counts&nbsp;here...').fadeIn();
            });

        } else if ( formError.data('tries') === 2 ) {

            formError.fadeOut(function() {
                formError.html('Sorry, something must be going wrong. This is really embarrassing, but could you email your RSVP to us at <a href="mailto:scott.p.donaldson@gmail.com">scott.p.donaldson@gmail.com</a>?').fadeIn();
            });
        }
    }

    // Error to show when an empty name was passed
    function showEmpty() {
        formError = $('<div id="form-error">Er, we need to know your name to help process your RSVP. Do you know how many people will be trying to crash this wedding?</div>').hide();
        formError.data('tries', 0);
        container.append(formError.fadeIn());
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
        showForm: showForm,
        showError: showError,
        showEmpty: showEmpty
    };
}

module.exports = UI;
