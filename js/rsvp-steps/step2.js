import React from 'react';
import util from '../util';

class StepTwo extends React.Component {

	constructor() {
		super();

		this.state = {
			showParty: false,
			userRsvp: false,
			errorMessage: ''
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

		let manageRsvp = (name, rsvp) => {
			// update RSVP
			this.props.stepManager.rsvp.call(null, name, rsvp);

			// if showing full party and an error message had been shown,
			// remove it once all party members are accounted for
			if ( this.state.showParty ) {
				for ( let name in this.props.response.party ) {
					if ( !(name in this.props.stepManager.getSubmitRsvp()) ) {
						return null;
					}
				}
			} 
			
			// otherwise, on change, error message should be null
			this.setState({
				errorMessage: ''
			});
		};

		let showInputs = (name) => {
			return (
				<div>
					<input type="radio" name={"attending-" + util.scrub(name)} id={"attending-" + util.scrub(name) + "-yes"} onChange={manageRsvp.bind(this, name, true)} />
	            	<label htmlFor={"attending-" + util.scrub(name) + "-yes"}>Yes!</label><br />
	            	<input type="radio" name={"attending-" + util.scrub(name)} id={"attending-" + util.scrub(name) + "-no"} onChange={manageRsvp.bind(this, name, false)} />
	            	<label htmlFor={"attending-" + util.scrub(name) + "-no"}>No 😢</label>
	            </div>
	        );
		};

		let manageTheParty = (bool) => {
			this.setState({
				showParty: bool
			});
		};

		let showTheParty = manageTheParty.bind(this, true);
		let hideTheParty = () => {
			
			manageTheParty.call(this, false);
			
			// on hiding the party, in case user had checked, remove add'l party RSVPs
			for ( let name in this.props.response.party ) {
				if ( this.props.stepManager.getSubmitRsvp()[name] ) {
					delete this.props.stepManager.getSubmitRsvp()[name];
				}
			}

			// if user has RSVPed their self, remove error message
			if ( this.props.response.name in this.props.stepManager.getSubmitRsvp() ) {
				this.setState({
					errorMessage: ''
				});
			}
		};

		let showPartyLinkStyle = { display: this.state.showParty ? 'none' : 'block' };
		let showPartyStyle = { display: this.state.showParty ? 'block' : 'none' };

		let rsvpForAll = () => {
			this.setState({
				errorMessage: 'Hey, you haven\'t finished your RSVP! Please finish before moving on. We promise it\'ll be worth your while.'
			});
		};

		let checkRsvp = (e) => {
			e.preventDefault();

			// need to make sure all radio buttons have been checked
			if ( !(this.props.response.name in this.props.stepManager.getSubmitRsvp()) ) {
				return rsvpForAll.call(this);
			
			// if showing the party, make sure they've checked all
			} else if ( this.state.showParty ) {
				for ( let name in this.props.response.party ) {
					if ( !(name in this.props.stepManager.getSubmitRsvp()) ) {

						console.log('no rsvp for party');
						return rsvpForAll.call(this);
					}
				}
				this.props.stepManager.proceed();
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
		}).concat(<a href="#" key="nvm" onClick={hideTheParty.bind(this)}>Never mind, I am just going to RSVP for myself.</a>);
		party.unshift(<p key="">Your party:</p>);

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

                	<a href="#" onClick={showTheParty} style={showPartyLinkStyle}>Would you like to RSVP for your party?</a>

                	<div style={showPartyStyle}>
                		{party}
                	</div>

                	<div className="clearfix">
		                <input type="submit" id="submit" value="Ok, lets go!" />
		            </div>
                </div>

                {this.state.errorMessage}
            </form>
        );
	}
}

export default StepTwo;