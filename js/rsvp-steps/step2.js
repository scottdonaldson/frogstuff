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
			display: this.props.response.rsvp === true || this.props.response.rsvp === false ? 'block' : 'none'
		};

		let hasNotRsvped = {
			display: this.props.response.rsvp === true || this.props.response.rsvp === false ? 'none' : 'block'
		}

		let marginStyle = {
			display: 'block',
			margin: '10px 0'
		};

		let name = this.props.response.name ? this.props.response.name.split(' ')[0] : '';

		let rsvpText = () => {
			let response = this.props.response;
			
			let submitter = response.submitter ? response.submitter.split(' ')[0] : false;

			if ( response.name === response.submitter ) submitter = false;

			let __html = '<div><p>Your RSVP ' + ( response.rsvp ? 'to attend' : 'to sit this one out' ) + ' has been ' + ( submitter ? 'submitted by ' + submitter + '.' : ' received.' ) + '</p>';
			__html += '<p>If you need to change your RSVP, please email us ' + ( submitter ? '(or ask ' + submitter + ' to email us)' : '' ) + ' by March 1st to make sure it gets updated: <a href="mailto:scott.p.donaldson@gmail.com">scott.p.donaldson@gmail.com</a></p></div>';
			return {
				__html
			};
		};

		let plusOne = this.props.response.party;
		let hasPlusOne = false;
		let showPlusOne = {
			display: 'none'
		};

		let showPartyLinkStyle = { 
			display: this.state.showParty ? 'none' : 'block',
			margin: '20px 0 10px'
		};

		let rsvpForAll = () => {
			this.setState({
				errorMessage: 'Hey, you haven\'t finished your RSVP! Please finish before moving on. We promise it\'ll be worth your while.'
			});
		};
		
		if ( plusOne && Object.keys(plusOne)[0] === '1' ) {
			hasPlusOne = true;
			showPlusOne.display = 'block';
			showPartyLinkStyle.display = 'none';

		// no plus one or party
		} else if ( !plusOne || Object.keys(plusOne).length === 0 ) {
			showPartyLinkStyle.display = 'none';
		// not needed?
		} else {
			plusOne = '';
		}

		let plusOneInvite = () => {
			let style = {
				margin: '10px 0'
			};
			return hasPlusOne ? (
				<div>
					<div style={style}>And, are you bringing a guest?</div>
					<input type="radio" name={"attending-guest"} id={"attending-guest-yes"} onChange={manageRsvp.bind(this, 'Guest', true)} />
	            	<label htmlFor={"attending-guest-yes"}>Yes</label><br />
	            	<input type="radio" name={"attending-guest"} id={"attending-guest-no"} onChange={manageRsvp.bind(this, 'Guest', false)} />
	            	<label htmlFor={"attending-guest-no"}>No</label>
	            </div>
			) : '';
		}

		let partyMembers = Object.keys(this.props.response.party || {});

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

				// uncheck the boxes
				$('[name="attending-' + util.scrub(name) + '"]').attr('checked', false);
			}

			// if user has RSVPed their self, remove error message
			if ( this.props.response.name in this.props.stepManager.getSubmitRsvp() ) {
				this.setState({
					errorMessage: ''
				});
			}
		};

		let showPartyStyle = { display: this.state.showParty ? 'block' : 'none' };

		let checkRsvp = (e) => {
			e.preventDefault();

			let noneAttending = true;

			// need to make sure all radio buttons have been checked
			if ( !(this.props.response.name in this.props.stepManager.getSubmitRsvp()) ) {
				
				return rsvpForAll.call(this);

			// if has a plus one, must check it
			} else if ( hasPlusOne && !('Guest' in this.props.stepManager.getSubmitRsvp()) ) {

				return rsvpForAll.call(this);
			
			// if showing the party, make sure they've checked all
			} else if ( this.state.showParty ) {
				for ( let name in this.props.response.party ) {
					if ( this.props.stepManager.getSubmitRsvp()[name] === true ) {
						noneAttending = false;
					}
					if ( !(name in this.props.stepManager.getSubmitRsvp()) ) {
						return rsvpForAll.call(this);
					}
				}
				this.props.stepManager.proceed();
			} else {
				// if just rsvp-ing for self, see if attending
				for ( let name in this.props.stepManager.getSubmitRsvp() ) {
					if ( this.props.stepManager.getSubmitRsvp()[name] === true ) {
						noneAttending = false;
					}
				}
				this.props.stepManager.proceed();
			}

			if ( noneAttending ) {
				// submit but do not proceed on success callback
				this.props.stepManager.submit(true);
			}
		};

		let party = partyMembers.map(member => {
			return (
				<div key={member}>
					<p>{member}</p>
					{showInputs.call(this, member)}
	            </div>
			);
		}).concat(
			<div style={marginStyle}>
				<a href="#" key="nvm1" onClick={hideTheParty.bind(this)}>Never mind, I am just going to RSVP for myself.</a>
				<a href="#" key="nvm2" className="no-underline" onClick={hideTheParty.bind(this)}> ▴</a>
			</div>
		);
		party.unshift(!hasPlusOne ? <h3 key="">Your party:</h3> : '');

		let submitStyle = {
			marginTop: 20
		};

		return (
			<form style={this.props.style} onSubmit={checkRsvp.bind(this)}>
                <h2>Hi {name}!</h2>
                
                <div style={hasRsvped} dangerouslySetInnerHTML={rsvpText()}></div>
                
                <div style={hasNotRsvped}>
                	
                	<p>Well, here we are, popping the big question: will you be attending?</p>
                	{showInputs.call(this, this.props.response.name)}

                	<div style={showPlusOne}>
                		{plusOneInvite()}
                	</div>

                	<div style={showPartyLinkStyle}>
						<a href="#" onClick={showTheParty}>Would you like to RSVP for someone else in your party?</a>
						<a href="#" className="no-underline" onClick={showTheParty}> ▾</a>
					</div>

                	<div style={showPartyStyle}>
                		{party}
                	</div>

                	<div className="clearfix">
		                <input type="submit" style={submitStyle} value="Ok, let's go!" />
		            </div>
                </div>

                {this.state.errorMessage}
            </form>
        );
	}
}

export default StepTwo;