import React from 'react';
import util from '../util';

class StepFour extends React.Component {
	constructor() {
		super();
	}

	render() {

		let response = {
			__html: '<p>Thanks for submitting your RSVP. We\'re looking forward to seeing you in Washington, DC in May!</p><p>If you need to change your RSVP, please email <a href="mailto:scott.p.donaldson@gmailcom">scott.p.donaldson@gmail.com</a> (up to March&nbsp;1st).</p><p><a href="/">Click here to read more about what we\'ve got planned.</a></p>'
		};

		return <div style={this.props.style} dangerouslySetInnerHTML={response}></div>;
	}
}

export default StepFour;