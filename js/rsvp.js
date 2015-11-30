import React from 'react';
import ReactDOM from 'react-dom';
import util from './util';
import gsheet from './gsheet2';
import rsvpHandler from './rsvp-handler';
import rsvpUI from './rsvp-ui';

import Step1 from './rsvp-steps/step1';
import Step2 from './rsvp-steps/step2';
import Step3 from './rsvp-steps/step3';

let buildURL = () => {
    var key1 = '1g6-vCbyXGaaqebez1cUwx',
        key2 = 'gNyLvlEIen_MBjyTVrcUcU';
    return 'https://spreadsheets.google.com/feeds/cells/' + key1 + key2 + '/1/public/basic?alt=json';
};

let container = $('#content-container'),
    form = $('#check-name'),
    sheet = false;

let handler = rsvpHandler(form);
let ui = rsvpUI(container);

class FormComponent extends React.Component {
    
    constructor() {
        super();

        this.state = {
            step: 1
        };
    }

    componentWillMount() {
        // once the data from the sheet is ready, update the handler
        let sheet = gsheet(buildURL());
        sheet.ready(() => {

            // hide loading animation
            hub.trigger('loaded');

            // update form handler with data
            handler.updateWith(sheet.byKey());
        });
    }

    render() {

        let step1Style = {
            display: this.state.step === 1 ? 'block' : 'none'
        };

        return (
            <Step1 />
            <Step2 />
            <Step3 />
        );
    }
}

ReactDOM.render(
    <FormComponent />,
    document.getElementById('content-container')
);

/* handler.on('empty', ui.showEmpty);
handler.on('success', ui.showForm);
handler.on('error', ui.showError);
*/