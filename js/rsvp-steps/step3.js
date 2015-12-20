import React from 'react';
import util from '../util';

class StepThree extends React.Component {

	constructor() {
		super();

		this.state = {
			errorMessage: ''
		};
	}

	render() {

		let submitRsvp = this.props.stepManager.getSubmitRsvp();

		let oneRsvp = false;

		let party = Object.keys(submitRsvp).map((name) => {
			if ( submitRsvp[name] ) {
				oneRsvp = true;
				return (
					<div key={name}>
						<p>{name}</p>
						<input type="radio" name={"shrimp-" + util.scrub(name)} id={"shrimp-" + util.scrub(name) + "-yes"} />
		            	<label htmlFor={"shrimp-" + util.scrub(name) + "-yes"}>Shrimp!</label><br />
		            	<input type="radio" name={"not-shrimp-" + util.scrub(name)} id={"not-shrimp-" + util.scrub(name) + "-no"} />
		            	<label htmlFor={"not-shrimp-" + util.scrub(name) + "-no"}>Not shrimp 😢</label>
					</div>
				);
			}
			return null;
		});

		let showIfOne = { display: oneRsvp ? 'block' : 'none' };
		let hideIfOne = { display: oneRsvp ? 'none' : 'block' };
		let hideIfOneText = {
			__html: 'We\'re sorry we won\'t see you there, but we know you\'ll be with us in&nbsp;spirit!<br>If you need to change your RSVP, you can always email <a href="mailto:scott.p.donaldson@gmailcom">scott.p.donaldson@gmail.com</a> (up to May&nbsp;1st).'
		};

		let showIfFinished = { display: this.state.finished ? 'block' : 'none' };
		if ( this.state.finished ) showIfOne.display = hideIfOne.display = 'none';

		let finishIt = () => {

		};

		let setRestrictions = (e) => {
			this.props.stepManager.set('restrictions', e.target.value);
		};

		return (
			<form style={this.props.style} onSubmit={finishIt.bind(this)}>
				<div style={showIfOne} ref="showIfOne">
	                <h2>Bon Appetit!</h2>
	                {party}
	                <p>Any dietary restrictions or special requests?</p>
	                <textarea onChange={setRestrictions.bind(this)} onKeyup={setRestrictions.bind(this)}></textarea>
	                <input type="submit" value="Send away!" />
	            </div>
	            <div style={hideIfOne} ref="hideIfOne">
	            	<p dangerouslySetInnerHTML={hideIfOneText}></p>
	            </div>
	            {this.state.errorMessage}
            </form>
        );
	}
}

export default StepThree;