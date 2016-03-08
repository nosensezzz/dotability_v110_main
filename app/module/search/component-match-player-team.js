'use strict';

var _ = require("lodash");

var React = require('react-native'),
	styles = require("../../style/generalStyle"),
	
{
  View,
  Component,
} = React;

var ComponentPlayerRow = require("./component-match-player-row");

class PlayerTeam extends Component {
	constructor(props){
		super(props);
		var self = this;

		self.state = {
			team : props.team,
			user : props.user
		};
	}

	render() {
		var self = this,
			user = self.state.user,
			team = self.state.team;

		
		return (
			<View>
				<ComponentPlayerRow player={team[0]} user={user}/>
				<ComponentPlayerRow player={team[1]} user={user}/>
				<ComponentPlayerRow player={team[2]} user={user}/>
				<ComponentPlayerRow player={team[3]} user={user}/>
				<ComponentPlayerRow player={team[4]} user={user}/>
			</View>
		);
	}
}

module.exports = PlayerTeam;