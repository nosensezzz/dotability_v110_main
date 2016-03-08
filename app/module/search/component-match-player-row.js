'use strict';

var _ = require("lodash"),
	apiSteam = require("../../service/api-steam");

var React = require('react-native'),
	styles = require("../../style/generalStyle"),
	
{
  StyleSheet,
  Text,
  View,
  Image,
  Component,
  ActivityIndicatorIOS,
  NavigatorIOS
} = React;

class PlayerRow extends Component {
	constructor(props){
		super(props);
		var self = this,
			player = props.player,
			user = props.user;

		self.state = {
			player : player,
			user : user,
			hero_pictrue : apiSteam.findHeroPictrue(player.hero_id),
			hero_info : apiSteam.findHeroInfo(player.hero_id),
			JSON_Status : apiSteam.getLeaverStatus()
		};
	}

	render() {
		var self = this, leaver_status = "",
			user = self.state.user,
			player = self.state.player,
			isUser = false;
		if(user.account_id === player.account_id){ isUser = true; }

		if(player.leaver_status !== 0){
			_.forEach(self.state.JSON_Status, function (status) {
				if(status.id == player.leaver_status){
					leaver_status = " (" + status.description + ")";
					return;
				}
			});
		}
		return (
			<View style={{
				flexDirection:"row",
				flex:1,
				borderColor: "#D7D7D7",
				borderBottomWidth:1,
				backgroundColor: isUser?"#ECECEC":"transparent",
			}}>
				<Image 
				source={self.state.hero_pictrue}
				style={{
					height: 45,
					width: 80,
					bottom:0,
					borderWidth: isUser?0:0,
					borderColor: "#FFFFFF",
				}} />

				<View style={{
					flex:1,
					flexDirection: "column",
					paddingLeft:3
				}}>
					<Text style={{flexDirection:"row",fontWeight: "bold"}}>
						{self.state.hero_info.localized_name}
						<Text style={{fontWeight: "bold",color:"red"}}>
							{leaver_status}
						</Text>
					</Text>
					<Text>
						KDA:{player.kills}/{player.deaths}/{player.assists} |
						GPM:{player.gold_per_min} |
						EPM:{player.xp_per_min}
					</Text>
				</View>
			</View>
		);
	}
}

module.exports = PlayerRow;