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
			let leftMar = (amt) => { 
				return { marginLeft: amt };
			};
			if ( submitRsvp[name] ) {
				oneRsvp = true;
				return (
					<div key={name}>
						<p>{name}</p>
						<input type="radio" name={"dinner-" + util.scrub(name)} id={"fish-" + util.scrub(name)} />
		            	<label htmlFor={"fish-" + util.scrub(name)}>Salmon</label><br />
		            	<input type="radio" name={"dinner-" + util.scrub(name)} id={"veg-" + util.scrub(name)} />
		            	<label htmlFor={"veg-" + util.scrub(name)}>Gnocchi (Vegetarian)</label><br />
		            	<label htmlFor={"brunch-" + util.scrub(name)} style={leftMar(0)}>Will attend brunch on May 22nd: <input id={"brunch-" + util.scrub(name)} type="checkbox" style={leftMar(5)} /></label>
					</div>
				);
			}
			return null;
		});

		let showIfOne = { display: oneRsvp ? 'block' : 'none' };
		let hideIfOne = { display: oneRsvp ? 'none' : 'block' };
		let hideIfOneText = {
			__html: 'We\'re sorry we won\'t see you there, but we know you\'ll be with us in&nbsp;spirit!<br>If you need to change your RSVP, please email <a href="mailto:scott.p.donaldson@gmailcom">scott.p.donaldson@gmail.com</a> (up to March&nbsp;1st).'
		};

		let showIfFinished = { display: this.state.finished ? 'block' : 'none' };
		if ( this.state.finished ) showIfOne.display = hideIfOne.display = 'none';

		let finishIt = () => {
			// submit data
		};

		let setRestrictions = (e) => {
			this.props.stepManager.set('restrictions', e.target.value);
		};

		return (
			<form style={this.props.style} onSubmit={finishIt.bind(this)}>
				<div style={showIfOne} ref="showIfOne">
	                <h2>Bon Appetit!</h2>
	                {party}
	                <p>Any dietary restrictions?</p>
	                <textarea onChange={setRestrictions.bind(this)} onKeyup={setRestrictions.bind(this)}></textarea>
            		<div onClick={this.props.stepManager.retreat} className="back-button">
            			<a href="#">Back</a>
            		</div>
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