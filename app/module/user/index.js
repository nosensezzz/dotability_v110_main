var 
React = require('react-native'),

{
    StyleSheet, 
    View, 
    Component,
    Text,
    Navigator,
    TouchableHighlight,
    ActivityIndicatorIOS
} = React,

LoginPage = require("./login"),
AboutusPage = require("./aboutus");

class User extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        var self = this;
    }

    _renderScene(route, navigator){
        var self = this;
        navigator.back = function (r) {
            if(r.index > 0){ this.pop(); }
        }

      switch(route.index){
        case 0:
        return ( <LoginPage nav={navigator} route={route} /> );
        case 99:
        return ( <AboutusPage nav={navigator} route={route} /> );
        break;
        default:
        break;
      }
    }

    render() {
        var self = this, content,
            routeArray = [
                {name: "LoginPage", index:0},
                {name: "AboutusPage", index: 99}
            ];
        if(1==2){ // loading the content

        } else {
            content = <Navigator
            initialRoute={routeArray[0]}
            initialRouteStack={routeArray}
            renderScene={this._renderScene} />;
        }

        return (
            <View style={{
                flex:1
            }}>
                {content}
            </View>
            
        );
    }
}

module.exports = User;