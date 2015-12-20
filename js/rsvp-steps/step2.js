import React from 'react';
import util from '../util';

class StepTwo extends React.Component {

	constructor() {
		super();

		this.state = {
			showParty: false,
			userRsvp: false
		};
	}

	render() {

		let hasRsvped = {
			display: this.props.response.rsvp === true ? 'block' : 'none'
		};

		let hasNotRsvped = {
			display: this.props.response.rsvp === true ? 'none' : 'block'
		}

		let name = this.props.response.name ? this.props.response.name.split(' ')[0] : '';

		let rsvpText = () => {
			let response = this.props.response;
			
			let submitter = response.submitter ? response.submitter.split(' ')[0] : false;

			if ( response.name === response.submitter ) submitter = false;

			let __html = '<div><p>Your RSVP ' + ( response.rsvp ? 'to attend' : 'to sit this one out' ) + ' has been ' + ( submitter ? 'submitted by ' + submitter + '.' : ' received.' ) + '</p>';
			__html += '<p>If you need to change your RSVP, please email us ' + ( submitter ? '(or ask ' + submitter + ' to email us)' : '' ) + ' as soon as possible to make sure it gets updated: <a href="mailto:scott.p.donaldson@gmail.com">scott.p.donaldson@gmail.com</a></p></div>';
			return {
				__html
			};
		};

		let plusOne = this.props.response.party;
		let showPlusOne = {
			display: 'none'
		};
		
		if ( plusOne && Object.keys(plusOne)[0] === '1' ) {
			showPlusOne.display = 'block';
			plusOne = 'Would you like to RSVP for a guest?';
		} else {
			plusOne = '';
		}

		let partyMembers = Object.keys(this.props.response.party || {});

		if ( showPlusOne.display === 'block' ) {
			this.setState({
				showParty: false
			});
		}

		let showInputs = (name) => {
			return (
				<div>
					<input type="radio" name={"attending-" + util.scrub(name)} id={"attending-" + util.scrub(name) + "-yes"} onChange={this.props.stepManager.rsvp.bind(null, name, true)} />
	            	<label htmlFor={"attending-" + util.scrub(name) + "-yes"}>Yes!</label><br />
	            	<input type="radio" name={"attending-" + util.scrub(name)} id={"attending-" + util.scrub(name) + "-no"} onChange={this.props.stepManager.rsvp.bind(null, name, false)} />
	            	<label htmlFor={"attending-" + util.scrub(name) + "-no"}>No 😢</label>
	            </div>
	        );
		};

		let showTheParty = () => {
			this.setState({
				showParty: true
			});
		};

		let showPartyLinkStyle = { display: this.state.showParty ? 'none' : 'block' };
		let showPartyStyle = { display: this.state.showParty ? 'block' : 'none' };

		let checkRsvp = (e) => {
			e.preventDefault();

			// need to make sure all radio buttons have been checked
			if ( !(this.props.response.name in this.props.stepManager.getSubmitRsvp()) ) {
				console.log('hey, no good!');
			} else if ( this.state.showParty ) {
				for ( let name in this.props.response.party ) {
					if ( !(name in this.props.stepManager.getSubmitRsvp()) ) {
						console.log('hey, you must RSVP for your party!');
					}
				}
			} else {
				this.props.stepManager.proceed();
			}
		};

		let party = partyMembers.map(member => {
			return (
				<div key={member}>
					<p>{member}</p>
					{showInputs.call(this, member)}
	            </div>
			);
		});

		return (
			<form style={this.props.style} onSubmit={checkRsvp.bind(this)}>
                <h2>Hi {name}!</h2>
                
                <div style={hasRsvped} dangerouslySetInnerHTML={rsvpText()}></div>
                
                <div style={hasNotRsvped}>
                	
                	<p>Well, here we are, popping the big question: will you be attending?</p>
                	{showInputs.call(this, this.props.response.name)}

                	<div style={showPlusOne}>
                		{plusOne}
                	</div>

                	<a href="#" onClick={showTheParty.bind(this)} style={showPartyLinkStyle}>Would you like to RSVP for your party?</a>

                	<div style={showPartyStyle}>
                		{party}
                	</div>

                	<div className="clearfix">
		                <input type="submit" id="submit" value="Ok, lets go!" />
		            </div>
                </div>
            </form>
        );
	}
}

export default StepTwo;