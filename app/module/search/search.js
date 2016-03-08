'use strict';

var React = require('react-native'),
	_ = require("lodash"),
	moment = require("moment"),
	Hero = require('../../lib/hero.json'),
	Const = require("../../service/Constant"),
	Formatter = require("../../service/DTO-Formatter"),
	styles = require("../../style/generalStyle"),
	apiSteam = require("../../service/api-steam"),
	LocalStorage = require("../../service/api-local-storage"),
	FoundUser = require("./found-user.js"),

{
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TextInput,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS,
  NavigatorIOS,
  AsyncStorage
} = React;

class Search extends Component {
	constructor(props){
		super(props);
		this.state = {
			app: props.app,
			NumberID: null,
			userNotFound: false,
			loading: false,
			loading_storedUser: true,
		}

		this._loadStoredUsers();
	}

	_loadStoredUsers(){
		var self = this,players, DS, p1;

		DS = new ListView.DataSource({
			rowHasChanged: (r1 , r2) => r1 != r2
		});

		AsyncStorage.getItem(Const.KEY_PLAYERS)
		.then((value)=>{
			if(!value){
				self.setState({
					loading_storedUser:false,
					history_reloading: false,
					history_players: DS.cloneWithRows([])
				});
				return;
			}
			players = value.split("_");
			Formatter.getSearchHistory(players, (callback)=>{
				p1 = new Promise(function(resolve, reject){
					callback = callback.sort(function (a , b) {
						return (a.requestTime <= b.requestTime);
					});
					resolve(callback);
				});
				p1.then((sorted)=>{
					self.setState({
						loading_storedUser:false,
						history_reloading: false,
						history_players: DS.cloneWithRows(sorted),
					});
				});
			});
		})
		.catch((err)=>{console.log(err);});
	}

	SearchPressed(type , id){
		var self =this, dotaid;

		if(self.state.loading){ 
			return; 
		} else {
			switch (type){
				case "search":
				dotaid = self.state.NumberID;
				break;
				case "history":
				dotaid = apiSteam.steamidToDotaid(id);
				break;
				default:break;
			}

			self.setState({
					loading : true
				});
				apiSteam.searchUser({
					dotaID: dotaid
				} , (results)=>{
					if(results && results.timeout){
						self.setState({
							api_timeout:true,
							loading:false
						});
						return;
					}
					if(results.response.players.length > 0){
						self.setState({
							userNotFound:false
						});

						self.props.navigator.push({
							title: "Found User",
							component: FoundUser,
							passProps: {
								user: results.response.players[0],
								searchVM : self
							}
						});

						setTimeout(()=>{
							self.setState({
								loading:false
							});
						}, 1000);

						LocalStorage.Search_Save_User(
							results.response.players[0] , 
							(callback)=>{
								if(callback){
									// true => saved
									// false => exist
								}
							} ,
							(err)=>{
								//console.log(err);
							});
					} else {
						self.setState({
							userNotFound:true
						});

						self.setState({
							loading : false
						});
					}
				});
		}
	}

	containerPressed(event){
		this.refs.idInput.blur();
		return;
	}

	renderHistoryList(data , rowID , sectionID){
		var self = this,
			searchTime = moment.unix(data.requestTime).fromNow();

		return (
			<View style={{
				flexDirection:"row",
				borderColor: "#D7D7D7",
				borderBottomWidth:1
			}}

			onTouchStart={self.onSingleHistoryPressed.bind(self , data)} 
			onTouchEnd={self.onSingleHistoryReleased.bind(self , data)} 
			onTouchMove={self.onSingleHistoryDragged.bind(self , data)} >
				<Image 
				source={{uri: data.avatar}}
				style={{
					height: 60,
					width: 60
				}} />
				<View style={{
					flex:1,
					paddingLeft: 10,
					flexDirection: "column",

				}}>
					<Text style={styles.bold} >{data.username} ({data.dotaid})</Text>
					<Text>{searchTime}</Text>
				</View>
			</View>
		);
	}

	onSingleHistoryPressed( history ){
		var self = this;

		self.setState({
			selectedHistory: history
		});
	}

	onSingleHistoryDragged(history){
		this.setState({
			selectedHistory: null
		});
	}

	onSingleHistoryReleased(history){
		var self = this;
		if(self.state.loading){
			return;
		} else {
			if(self.state.selectedHistory === history){

			self.SearchPressed("history" , history.steamid);
		}
		}
	}

	historyListScolled(e){
		var self = this,
			offsetY = e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y;

		if(self.state.history_reloading){
			return;
		} else {
			if(offsetY < -90){
				self.setState({
					history_reloading: true,
					loading_storedUser: true
				});
				self._loadStoredUsers();
			}
		}
	}

	render() {
		var self = this, 
			errMsg, 
			loadingIcon, 
			loadingHistoryIcon,
			SearchHistoryList;
		if(self.state.userNotFound){
			errMsg = <Text style={styles.errMsg}>
				No Such User!
			</Text>
		} else {
			errMsg = <View />
		}

		self.state.loading ? loadingIcon = <ActivityIndicatorIOS 
					animating={self.loading}
					size="large" 
					style={styles.search_loadingicon} /> : null;

		self.state.loading_storedUser ? loadingHistoryIcon = <ActivityIndicatorIOS 
					animating={self.loading}
					size="large" 
					style={styles.founduser_loadingicon} /> 
					: 
					loadingHistoryIcon = <ListView 
						contentInset={{bottom:49}}
  						automaticallyAdjustContentInsets={false}
						style={styles.history_container}
						dataSource={self.state.history_players}
						renderRow={self.renderHistoryList.bind(self)} 
						onScroll={self.historyListScolled.bind(self)} />;

		self.state.api_timeout ? 
					errMsg = <Text style={styles.errMsg}>
								Time Out
							</Text>
					:
					null;
		return (
			<View 
				style={styles.search_container}
				onTouchStart={this.containerPressed.bind(this)}>
				<Text style={styles.title}></Text>

				<TextInput 
				ref="idInput"
				onChangeText={(numberID) => this.setState({NumberID:numberID})}
				style={styles.input} 
				placeholder="Steam ID" />

				<TouchableHighlight 
				onPress={this.SearchPressed.bind(this, "search", this.state.NumberID)}
				style={styles.button}>
					<View style={styles.button_text_view}>
						<Text style={styles.buttonText}>
							Search
						</Text>
						{loadingIcon}
					</View>
				</TouchableHighlight>
				{errMsg}
				{loadingHistoryIcon}
			</View>
		);
	}
}

module.exports = Search;