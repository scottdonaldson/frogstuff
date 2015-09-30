function buildURL() {
    var key1 = '1g6-vCbyXGaaqebez1cUwx',
        key2 = 'gNyLvlEIen_MBjyTVrcUcU';
    return 'https://spreadsheets.google.com/feeds/cells/' + key1 + key2 + '/1/public/basic?alt=json';
}

var container = $('#content-container'),
    form = $('#check-name'),
    sheet = false;

var util = require('./util.js'),
    gsheet = require('./gsheet.js'),
    handler = require('./rsvp-handler.js')(form),
    ui = require('./rsvp-ui.js')(container);

// once the data from the sheet is ready, update the handler
gsheet(buildURL()).ready(function() {

    // hide loading animation
    hub.trigger('loaded');

    // show form
    form.fadeIn();

    // update form handler with data
    handler.updateWith(this.byKey());
});

handler.on('empty', ui.showEmpty);
handler.on('success', ui.showForm);
handler.on('error', ui.showError);
