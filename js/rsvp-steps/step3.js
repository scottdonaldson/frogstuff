import React from 'react';
import util from '../util';

class StepThree extends React.Component {

	constructor() {
		super();

		this.state = {
			errorMessage: '',
			submitting: false
		};
	}

	render() {

		let submitRsvp = this.props.stepManager.getSubmitRsvp();

		let oneRsvp = false;

		let party = Object.keys(submitRsvp).map((name) => {
			
			let leftMar = (amt) => { return { marginLeft: amt }; };
			let topMar = (amt) => { return { marginTop: amt }; };

			let labelStyle = $.extend({}, leftMar(5), topMar(10));

			if ( submitRsvp[name] ) {
				oneRsvp = true;
				return (
					<div key={name}>
						<h3>{name}</h3>
						<input type="radio" name={"dinner-" + util.scrub(name)} id={"fish-" + util.scrub(name)} />
		            	<label htmlFor={"fish-" + util.scrub(name)}>Salmon</label><br />
		            	<input type="radio" name={"dinner-" + util.scrub(name)} id={"veg-" + util.scrub(name)} />
		            	<label htmlFor={"veg-" + util.scrub(name)}>Gnocchi (Vegetarian)</label><br />
		            	<label htmlFor={"brunch-" + util.scrub(name)} style={leftMar(0)}>Will be attending brunch on May 22nd: <input id={"brunch-" + util.scrub(name)} type="checkbox" style={labelStyle} /></label>
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

		let finishIt = (e) => {

			e.preventDefault();

			if ( showIfOne ) {

				this.setState({
					errorMessage: '',
					submitting: true
				});

				// submit data
				for ( let name in this.props.stepManager.getSubmitRsvp() ) {

					// if attending and hasn't selected dinner option, prevent submit
					if ( this.props.stepManager.getSubmitRsvp()[name] && $('[name="dinner-' + util.scrub(name) + '"]:checked').length === 0 ) {
						
						return this.setState({
							errorMessage: 'Don\'t forget to select a dinner option!',
							submitting: false
						});
					
					} else if ( this.props.stepManager.getSubmitRsvp()[name] ) {

						let dinnerChoice = $('[name="dinner-' + util.scrub(name) + '"]').attr('id');
						let label = $('label[for="' + dinnerChoice + '"]');
					
						this.props.stepManager.rsvp.call(null, name, {
							dinner: label.text(),
							brunch: $('#brunch-' + util.scrub(name)).is(':checked')
						});
					}
				}

				this.props.stepManager.submit();

			}
		};

		let setRestrictions = (e) => {
			this.props.stepManager.set('restrictions', e.target.value);
		};

		return (
			<form style={this.props.style} onSubmit={finishIt.bind(this)}>
				<div style={showIfOne} ref="showIfOne">
	                <h2>Yay! Now we just need a few more details...</h2>
	                {party}
	                <p>Any dietary restrictions?</p>
	                <textarea onChange={setRestrictions.bind(this)} onKeyup={setRestrictions.bind(this)}></textarea>
	                <div className="clearfix">
	            		<div onClick={this.props.stepManager.retreat} className="back-button">
	            			<a href="#">Back</a>
	            		</div>
		                <input ref="submit" type="submit" value={!this.state.submitting ? "Send away!" : 'Sending...'} />
		            </div>
	            </div>
	            <div style={hideIfOne} ref="hideIfOne">
	            	<p dangerouslySetInnerHTML={hideIfOneText}></p>
	            </div>
	            <div className="clearfix">
	            	{this.state.errorMessage}
	            </div>
            </form>
        );
	}
}

export default StepThree;