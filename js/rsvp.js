import React from 'react';
import ReactDOM from 'react-dom';
import util from './util';
import gsheet from './gsheet2';
import rsvpHandler from './rsvp-handler';
import rsvpUI from './rsvp-ui';

import StepOne from './rsvp-steps/step1';
import StepTwo from './rsvp-steps/step2';
import StepThree from './rsvp-steps/step3';

let buildURL = () => {
    var key1 = '1g6-vCbyXGaaqebez1cUwx',
        key2 = 'gNyLvlEIen_MBjyTVrcUcU';
    return 'https://spreadsheets.google.com/feeds/cells/' + key1 + key2 + '/1/public/basic?alt=json';
};

let container = $('#content-container'),
    form = $('#check-name'),
    sheet = false;

let handler = rsvpHandler();
let ui = rsvpUI(container);

class FormComponent extends React.Component {
    
    constructor() {

        super();

        this.state = {
            step: 1,
            submitRsvp: {}
        };

        let name = null;

        this.stepManager = {

            rsvp: (name, rsvp) => {

                let newRsvp = this.state.submitRsvp;
                
                newRsvp[name] = rsvp;

                this.setState({
                    submitRsvp: newRsvp
                });
            },

            getSubmitRsvp: () => {
                return this.state.submitRsvp
            },

            set: (key, value) => {
                let newState = {};
                newState[key] = value;
                this.setState(newState);
            },
            
            proceed: (response) => {

                this.setState({
                    step: this.state.step + 1
                }, () => {

                    if ( response ) {

                        name = response.name;

                        this.setState({
                            name,
                            party: response.party,
                            rsvp: response.rsvp,
                            submitter: response.submitter
                        });

                    }

                    let prevStep = this.refs[this.state.step - 1];
                    prevStep = ReactDOM.findDOMNode(prevStep);
                    prevStep = $(prevStep);
                    prevStep.fadeOut(() => {
                        let newStep = this.refs[this.state.step];
                        newStep = ReactDOM.findDOMNode(newStep);
                        newStep = $(newStep);
                        newStep.fadeIn();
                    });
                });
            },

            submit: () => {

            }
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

        let step2Style = { display: 'none' };

        let step3Style = $.extend({}, step2Style);

        return (
            <div>
                <StepOne ref="1" stepManager={this.stepManager} handler={handler} />
                {this.state.step > 1 ? <StepTwo ref="2" style={step2Style} stepManager={this.stepManager} response={this.state} /> : ''}
                {this.state.step === 3 ? <StepThree ref="3" style={step3Style} stepManager={this.stepManager} /> : ''}
            </div>
        );
    }
}

ReactDOM.render(
    <FormComponent />,
    document.getElementById('content-container')
);