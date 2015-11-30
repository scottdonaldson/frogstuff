import React from 'react';

class Step2 extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
			<div>
                <h2>Hi! Were glad youve decided to RSVP and (hopefully!) celebrate our wedding with us.</h2>
                <p>Enter your name below and lets get started:</p>
                <input id="your-name" name="your-name" type="text" />
                <input type="submit" id="submit" value="Ok, lets go!" />
            </div>
        );
	}
}

export default Step2;