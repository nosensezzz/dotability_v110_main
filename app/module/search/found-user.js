'use strict';

var React = require("react-native"),
	moment = require("moment"),
	_ = require("lodash"),
	LinearGradient = require('react-native-linear-gradient'),
	//d2location = require("dota2-location"),
	apiSteam = require("../../service/api-steam"),
	styles = require("../../style/generalStyle"),

{
	Text,
	View,
	StyleSheet,
	processColor,
	Component,
	ListView,
	Image,
	LinkingIOS,
	TouchableHighlight,
	ActivityIndicatorIOS,
	NavigatorIOS
} = React,

PlayedMatch = require("./found-user-played-match"),

Dimensions = require("Dimensions"),
screenWidth = Dimensions.get('window').width,
screenHeight = Dimensions.get('window').height;

class FoundUser extends Component {
	constructor(props){
		super(props);

		var emptyDS = new ListView.DataSource({
				rowHasChanged: (r1 , r2) => r1 != r2
			}),
			user = props.user,
			searchVM = props.searchVM;

		user.dotaid = apiSteam.steamidToDotaid(props.user.steamid);

		this.state = {
			user: user,
			matches: emptyDS.cloneWithRows([]),
			isMatchesLoaded:false,
			searchVM: searchVM,
			location: ""
		};
	}

	componentWillMount(){
		var self = this, 
		userLocationInfo, 
		user = self.state.user,
		formatted = {
			location : "unknown location"
		};

		// User Info
		if(user.loccountrycode && user.locstatecode && user.loccityid){
			userLocationInfo = {
				country : user.loccountrycode,
				state : user.locstatecode,
				city : user.loccityid
			}

			// formatted.location = d2location.findTillCity(
			// 	userLocationInfo.country,
			// 	userLocationInfo.state,
			// 	userLocationInfo.city
			// );
			// console.log(formatted);

			// apiSteam.getUserLocation(userLocationInfo, (response)=>{
			// 	if(response.foundCountry){
			// 		formatted = {
			// 			location: response.foundCountry.name,
			// 			coordinates: response.foundCountry.coordinates
			// 		}
			// 		if(response.foundState){
			// 			formatted.location += " , " + response.foundState.name;
			// 			if(response.foundCity){
			// 				formatted.location += " , " + response.foundCity.name;
			// 			}
			// 		}
			// 	}
			// 	self.setState(formatted);
			// });
		}

		// User matches
		var userinfo = {}, errMsg;

		userinfo.steamID = self.state.user.steamid;
		apiSteam.getUserMatches(userinfo , (results , err)=>{
			var DS = new ListView.DataSource({
				rowHasChanged: (r1 , r2) => r1 != r2
			});
			if(err){
				errMsg = results.result.statusDetail;
				self.setState({
					matches: DS.cloneWithRows([]),
					isMatchesLoaded: true,
					errorLoadMatches: true,
					errMsg: errMsg
				});
			} else {
				self.setState({
					matches: DS.cloneWithRows(results.result.matches),
					isMatchesLoaded: true
				});
			}
		});
	}

	componentDidMount(){
		var self = this;
	}

	renderMatch(data , rowID, sectionID){
		console.log(data.start_time);
		var self = this,
			startTime = moment(moment.unix(data.start_time).format()).fromNow(),
			hero, type;
		type = apiSteam.findLobbyType(data.lobby_type);
		hero = apiSteam.findHeroInfo(data.me.hero_id);

		return (
			<View style={{
				paddingLeft:0,
				paddingRight: 0,
				flex:1,
				flexDirection:"row",
				borderColor: "#D7D7D7",
				borderBottomWidth:1,
				position:"relative"
			}}
			onTouchStart={self.onSingleMatchPressed.bind(self , data)} 
			onTouchEnd={self.onSingleMatchReleased.bind(self , data)} 
			onTouchMove={self.onSingleMatchDragged.bind(self , data)} >
				<Image 
				source={data.myHeroImage}
				style={{
					height: 45,
					width: 80
				}} />

				<View style={{
					flex:1,
					position:"absolute",
					right:5,
					bottom:25,
					flexDirection: "column"
				}}>	
					<Text>{startTime}</Text>
				</View>

				<View style={{
					flex:1,
					position:"absolute",
					right:5,
					bottom:5,
					flexDirection: "column"
				}}>	
					<Text style={{fontWeight:"bold"}}>{type.name}</Text>
				</View>

				<View style={{
					flex:1,
					position:"absolute",
					left:85,
					top:2,
					flexDirection: "column"
				}}>
					<Text style={{fontWeight:"bold"}}>{hero.localized_name}</Text>
				</View>
			</View>
		);
	}

	onSingleMatchPressed( match ){
		var self = this;

		self.setState({
			selectedMatch: match
		});
	}

	onSingleMatchReleased(match){
		var self = this;
		if(self.state.selectedMatch === match){
			self.props.navigator.push({
				title: "Played Match",
				component: PlayedMatch,
				passProps: {
					theMatch: match
				}
			});
		} else {

		}
	}

	onSingleMatchDragged(match){
		this.setState({
			selectedMatch: null
		});
	}

	render(){
		var self = this,
			Matches, Text_TimeCreated,
			errMsg;

		if(!self.state.user.timecreated){ 
			Text_TimeCreated = <Text style={mystyle.font_1}>Invalid Date</Text>
		}
		else {
			Text_TimeCreated = <Text style={mystyle.font_1}>{moment(moment.unix(self.state.user.timecreated).format()).fromNow()}</Text>;
		}
		if(self.state.isMatchesLoaded){
			Matches = <ListView 
							style={styles.app_backgroundcolor}
							contentInset={{bottom:49}}
  							automaticallyAdjustContentInsets={false}
							dataSource={self.state.matches}
							renderRow={self.renderMatch.bind(self)} />
		} else {
			Matches = <ActivityIndicatorIOS 
						animating={!this.state.isMatchesLoaded}
						size="large" 
						style={mystyle.div_loading} />
		}

		if(self.state.errorLoadMatches){
			Matches = null;
			errMsg = <Text style={styles.app_err_msg}>{self.state.errMsg}</Text>
		} else {
			errMsg = null;
		}
		return (
				<View  style={styles.find_user_container}>
				 <LinearGradient 
				 	colors={['#4c669f', '#3b5998', '#192f6a']} 
				 	style={styles.find_user_userinfo_container}>
		          	<Image 
						source={{
							uri: self.state.user.avatar
						}}
						style={styles.find_user_userinfo_avatar} />
					<View style={styles.find_user_userinfo_username}>
						<Text style={mystyle.font_2}>
							{self.state.user.personaname}
						</Text>
						<Text 
							style={styles.hyperlink}
							onPress={()=>LinkingIOS.openURL(self.state.user.profileurl)}
							>Steam Profile
						</Text>
					</View>
					<View style={styles.find_user_userinfo_location}>
						<Text style={mystyle.font_1}>{self.state.location}</Text>
					</View>

					<View style={styles.find_user_userinfo_times}>
						<View style={mystyle.flex_row}>
							<Text style={mystyle.font_1}>Log Off:</Text>
							<Text style={mystyle.font_1}>{moment(moment.unix(self.state.user.lastlogoff).format()).fromNow()}</Text>
						</View>
						<View style={styles.flex_row}>
							<Text style={mystyle.font_1}>Created:</Text>
							{Text_TimeCreated}
						</View>
					</View>
		          </LinearGradient>
		          <View style={mystyle.div_matches}></View>
					{errMsg}
					{Matches}
				</View>
		);
	}
}

var mystyle = StyleSheet.create({
	section:{},
	div_user:{},
	font_1:{color:"white"},
	font_2:{color:"white",fontWeight:"bold"},
	div_matches:{
		backgroundColor: "#D6D6D6",
	    height:2,
	    width:screenWidth
	},
	div_loading:{
	    flex:1,
        alignSelf:"center",
        justifyContent: "center"
	},
	flex_row:{flexDirection:"row"}
});

module.exports = FoundUser;