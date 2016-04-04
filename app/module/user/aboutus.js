var React = require('react-native'),

{
    StyleSheet, 
    View, 
    ScrollView,
    Component,
    Text,
    Image,
    Navigator,
    TouchableHighlight,
    ActivityIndicatorIOS
} = React;

var

Dimensions = require("Dimensions"),
screenWidth = Dimensions.get('window').width,
screenHeight = Dimensions.get('window').height;

class About extends Component {
    constructor(props){
        super(props);
    }

    nav_back(e){
        this.props.nav.pop();
    }

    render() {
        var self = this;
        return (
            <View style={{
                flex:1,
                paddingTop: 20,
                position: "relative"
            }}>
                
                <ScrollView style={{ // Main View
                    flex: 1
                }}>
                    <View style={{ // Content View
                        height: screenHeight/3,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <Image 
                        source={require('../../lib/picture/site-logo.png')}
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 10
                        }} />
                    </View>
                    <View style={{ // Content View
                        padding: 5,
                        flex: 1,
                        position: 'relative'
                    }}>
                        <Text style={{
                            marginTop: 10
                        }}>
                        Instruction: Input dota 2 player unique ID number to look his/her match history.
                        </Text>

                        <Text style={{
                            marginTop: 10
                        }}>
                        This application is used for quick look up dota 2 player 
                        match history. It's easy to use and it's free.
                        </Text>

                        <Text style={{
                            marginTop: 10
                        }}>
                        We are a group that love game and play games, particular dota 2. And we are welcome
                        all talented players or developers join us.
                        </Text>

                        <Text style={{
                            marginTop: 10
                        }}>
                        This application will continue progress and add more and more functions, please looking forward it.
                        </Text>

                        <Text style={{
                            marginTop: 10
                        }}>
                        Special thanks to:{"\n"} 
                        <Text style={{color: "blue", fontWeight: "bold"}}>
                        Zuyu Zhang,{"\n"}
                        Hao Zheng,{"\n"}
                        Ming Sun,{"\n"}
                        </Text>
                        For all efforts made to improve the app.
                        </Text>

                        <Text style={{
                            marginTop: 10,
                        }}>
                        Github: nosensezzz/dotability_v110_main{"\n"}
                        Welcome all kinds of feedback.
                        </Text>
                        <Text style={{
                            marginTop: 10,
                            fontWeight: "bold"
                        }}>
                        Copyright © nosensezzz. All rights reserved.
                        </Text>
                    </View>

                </ScrollView>
                <Text
                    style={{
                        position: "absolute",
                        top: 30,
                        left: 10,
                        fontWeight: "bold",
                        textDecorationLine: "underline"
                    }}
                    onTouchStart={self.nav_back.bind(self)}>
                    Back
                </Text>
            </View>
        );
    }
}

module.exports = About;