import React from 'react';
import ReactDOM from 'react-dom';

class StepOne extends React.Component {

	constructor() {
		super();

		this.state = {
			tries: 0,
			showError: false,
			error: null
		};

		// An error from the form handler.
	    // Prompt the user to enter their name again.
	    this.showError = (response) => {

	        if ( !this.state.error || this.state.tries === 0 ) {

	            this.setState({
	            	showError: true,
	            	error: 'We couldn\'t find your name on the list. Did you spell it exactly as it was on your invitation?',
	            	tries: 1
	            });

	        } else if ( this.state.tries === 1 ) {

	            this.setState({
	            	showError: true,
	            	error: 'Hmmm, still no luck. Will you humor us and try one more time? Spelling really counts here...',
	            	tries: 2
	            });

	        } else if ( this.state.tries === 2 ) {

	        	this.setState({
	            	showError: true,
	            	error: 'Sorry, something must be going wrong. This is really embarrassing, but could you email your RSVP to us at <a href="mailto:scott.p.donaldson@gmail.com">scott.p.donaldson@gmail.com</a>?',
	            	tries: 2
	            });
	        }
	    };

	    // Error to show when an empty name was passed
	    this.showEmpty = () => {
	    	this.setState({
	    		showError: true,
	    		error: 'Er, we need to know your name to help process your RSVP. Do you know how many people will be trying to crash this wedding?',
	        	tries: 0
	        });
	    };
	}

	render() {

		let random = Math.round(Math.random() * 1000000000);

		let proceed = this.props.stepManager.proceed;

		let checkName = (e) => {
			e.preventDefault();

			let response = this.props.handler.checkName(this.refs['your-name'].value);

			if ( response.type === 'empty' ) return this.showEmpty();
			if ( response.type === 'error' ) return this.showError();

			this.props.stepManager.proceed(response);
		};

		let removeError = () => {
			this.setState({
				showError: false
			});
		};

		let inputClass = this.state.showError ? 'error' : '';
		let formErrorClass = this.state.showError ? 'active' : '';
		formErrorClass += ' form-error';

		let errorMessage = () => {
			return {
				__html: this.state.error
			};
		};

		return (
			<div>
				<form style={this.props.style} onSubmit={checkName}>
	                <h2>Hi! Were glad youve decided to RSVP and (hopefully!) celebrate our wedding with us.</h2>
	                <p>Enter your name below and lets get started:</p>
	                <input className={inputClass} ref="your-name" name={random} type="text" onChange={removeError} />
	                <div className="clearfix">
		                <input type="submit" id="submit" value="Ok, let's go!" />
		            </div>
	            </form>
	            <div className={formErrorClass} ref="error" dangerouslySetInnerHTML={errorMessage()}></div>
            </div>
        );
	}
}

export default StepOne;