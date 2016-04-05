'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Image,
  Component,
  NavigatorIOS,
  TabBarIOS
} = React;

var Search = require("./module/search/search"),
	User = require("./module/user/index");

class Main extends Component {
	constructor(props){
		super(props);

		this.state = {
			app: props.app,
			selectedTab: "user"
		}
	}

	render() {
		var self = this;
		return (
			<TabBarIOS style={styles.none}>
				<TabBarIOS.Item
					title="search"
					icon={require("image!zoom")}
					selected={this.state.selectedTab === "search"}
					onPress={()=>{ this.setState({selectedTab: "search"}) }}
				>
					<NavigatorIOS
						style={{
							flex: 1
						}}
						initialRoute={{
							component: Search,
							title: "Search"
						}}
						
					>
					</NavigatorIOS>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					title="User"
					icon={require("image!user")}
					selected={this.state.selectedTab === "user"}
					onPress={()=>{ this.setState({selectedTab: "user"}) }}
				>
					<User />
				</TabBarIOS.Item>
			</TabBarIOS>
		);
	}
}

var styles = StyleSheet.create({

});

module.exports = Main;
// edited
// curl http://localhost:8081/index.ios.bundle -o main.jsbundle?platform=ios
// org.reactjs.native.example.Dotability

/*
<TabBarIOS.Item
					title="home"
					icon={require("image!news-icon")}
					selected={this.state.selectedTab === "home"}
					onPress={()=>{ this.setState({selectedTab: "home"}) }}
				>
					<NavigatorIOS
						style={{
							flex: 1
						}}
						initialRoute={{
							component: Home,
							title: "Home"
						}}
					>
					</NavigatorIOS>
				</TabBarIOS.Item>
*/