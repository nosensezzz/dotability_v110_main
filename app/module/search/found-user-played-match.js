'use strict';

var _ = require("lodash");

var React = require('react-native'),
	Hero = require('../../lib/hero.json'),
	styles = require("../../style/generalStyle"),
	apiSteam = require("../../service/api-steam"),
	formatter = require("../../service/DTO-Formatter"),
	Dimensions = require('Dimensions'),
    screenWidth = Dimensions.get('window').width,
	
{
  StyleSheet,
  processColor,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Component,
  ActivityIndicatorIOS,
  NavigatorIOS
} = React,

Carousel = require('react-native-carousel'),
LinearGradient = require('react-native-linear-gradient'),
ComponentPlayerTeam = require("./component-match-player-team"),
Toast = require("../../react-component/toast");

class PlayedMatch extends Component {
	constructor(props){
		super(props);
		var self = this,
			match = props.theMatch;
		
		self.state = {
			Json_Mode : "",
			Json_Type : "",
			isMatchLoaded: false,
			me : match.me,
			timeout: false
		};
		apiSteam.getSelectedMatch({
			match_id: match.match_id,
			match_seq_num: match.match_seq_num,
			me: match.me
		} , (result)=>{
			console.log(result.timeout);
			if(result.timeout){
				self.setState({
					timeout: true
				});
			}
			formatter.formatMatch(result.result , (callback)=>{
				self.setState({
					match: result.result,
					dto_match: callback,
					isMatchLoaded: true
				});
			});
		});
	}

	componentWillMount(){
		this.setState({
			Json_Mode : apiSteam.getModeJson(),
			Json_Type : apiSteam.getTypeJson(),
		});
	}

	render() {
		var self = this,
			loadingIcon,
			mode = "-", type="-",
			won = null,
			direWon = null,
			radiantWon = null;

		if(self.state.timeout){
			return (
				<View style={{
					flex:1,
			        alignItems:"center",
			        justifyContent: "center"
					
				}}>
					<Text>Time out...</Text>
				</View>
			);
		}

		if(self.state.dto_match && self.state.dto_match.won === "dire"){
			direWon = " - Victory";
			radiantWon = "";
		} else {
			direWon = "";
			radiantWon = " - Victory";
		}

		if(self.state.match){
			_.forEach(self.state.Json_Mode.mods, function (m) {
				if(self.state.match.game_mode == m.id){
					mode = m.name;
				}
			});

			_.forEach(self.state.Json_Type.lobbies, function (l) {
				if(self.state.match.lobby_type == l.id){
					type = l.name;
				}
			});
		}

		loadingIcon = <ActivityIndicatorIOS 
					animating={!self.state.isMatchLoaded}
					size="large" 
					style={styles.founduser_loadingicon} />;

		if(!self.state.isMatchLoaded){
			return (
				<View style={{
					flex:1,
			        alignItems:"center",
			        justifyContent: "center"
					
				}}>
					{loadingIcon}
				</View>
			);
		} else {
			return (
				<Carousel 
				width={screenWidth}
				hideIndicators={false}
				indicatorOffset={35}
				animate={false}
				>
			        <ScrollView
			        	style={mystyle.carousel_section_1}>
			        	<LinearGradient 
						 	colors={['#57F9D6', '#E1FDEF', '#57F7A8']} 
						 	style={{
						 		height:30,
						 		width: screenWidth-20
						 	}}>	
						 	<View style={{
						 		flex:1,
						 		backgroundColor: 'transparent',
						 		justifyContent: 'center', 
						 	}}>
			        			<Text style={{
			        				fontSize: 20,
			        				marginLeft:5,
			        				fontWeight: "bold"
			        			}}>Radiant{radiantWon}</Text>
			        		</View>
			        	</LinearGradient>
						<ComponentPlayerTeam team={self.state.dto_match.team_radiant} user={self.state.me} />
						<LinearGradient 
						 	colors={['#D02727', '#E1FDEF','#D02727']} 
						 	style={{
						 		height:30,
						 		width: screenWidth-20
						 	}}>	
						 	<View style={{
						 		flex:1,
						 		backgroundColor: 'transparent',
						 		justifyContent: 'center', 
						 	}}>
			        			<Text style={{
			        				fontSize: 20,
			        				marginLeft:5,
			        				fontWeight: "bold"
			        			}}>Dire{direWon}</Text>
			        		</View>
			        	</LinearGradient>
						<ComponentPlayerTeam team={self.state.dto_match.team_dire} user={self.state.me}/>
					</ScrollView>

			        <View style={mystyle.carousel_section_2}>
			          <View style={{
			          	flex:1,
			          	padding:5
			          }}>	
			          		<View style={{
				          			flex:4,
	        						borderRadius:10,
	        						padding:5    						
				          		}}>
				          		<View style={{
				          			flex:1,
				          			backgroundColor:"white",
				          			flexDirection:"row",
				          			alignItems:"center",
	        						justifyContent: "center"
				          		}}>
				          			<View  style={{
				          				flex:1,
				          				//borderRightWidth:1,
				          				flexDirection:"column"
				          				//borderColor:"#F5F5F5"
				          			}}>
				          			<Image 
										source={require("image!time-icon")}
										style={{
											height:30,
											width:30,
											alignSelf:"center"
										}} />
				          			</View>
				          			<View style={{
										flex:3,
										marginRight:10,
										alignItems:"flex-end"
									}}>
									<Text>{self.state.dto_match.gameLastTime} min</Text>
									<Text>{self.state.dto_match.gameStartTimeInUTC}</Text>
									</View>
				          		</View>
				          	</View>
				          	<View style={{
				          			flex:4,
	        						borderRadius:10,
	        						padding:5 
	        					}}>
				          		<View style={{
				          			flex:1,
				          			backgroundColor:"rgba(0, 180, 255, 0.2);",
				          			flexDirection:"row",
				          			alignItems:"center",
	        						justifyContent: "center"
				          		}}>
				          			<View  style={{
				          				flex:1,
				          				flexDirection:"column"
				          			}}>
				          			<Image 
										source={require("image!game-type")}
										style={{
											height:30,
											width:30,
											alignSelf:"center"
										}} />
				          			</View>
				          			<View style={{
										flex:3,
										marginRight:10,
										alignItems:"flex-end"
									}}>
									<Text>{type}</Text>
									</View>
								</View>
							</View>
							<View style={{
				          			flex:4,
	        						borderRadius:10,
	        						padding:5  
	        					}}>
								<View style={{
				          			flex:1,
				          			backgroundColor:"rgba(97, 115, 144, 0.2);",
				          			flexDirection:"row",
				          			alignItems:"center",
	        						justifyContent: "center"
				          		}}>
				          			<View style={{
										flex:1,
				          				flexDirection:"column"
									}}>
									<Image 
										source={require("image!game-mode")}
										style={{
											height:30,
											width:30,
											alignSelf:"center"
										}} />
									</View>
									<View  style={{
										flex:3,
										marginRight:10,
										alignItems:"flex-end"
									}}>	
										<Text>{mode}</Text>
									</View>
								</View>	
							</View>	
						</View>
			        </View>
			    </Carousel>
				
			);
		}
	}
}

var mystyle = StyleSheet.create({
	carousel_section_1:{
	    flex:1,
	    marginTop:64,
	    marginBottom:50,
	    width: screenWidth,
	    backgroundColor: "#F5F5F5",
	    padding:10
	},

	carousel_section_2:{
	    flex:1,
	    marginTop:64,
	    marginBottom:50,
	    width: screenWidth,
	    backgroundColor: "#F5F5F5"
	},
});

module.exports = PlayedMatch;