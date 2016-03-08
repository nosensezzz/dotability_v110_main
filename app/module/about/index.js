var React = require('react-native'),

{
    StyleSheet, 
    View, 
    Component,
    Text,
    Image,
    Navigator,
    TouchableHighlight,
    ActivityIndicatorIOS
} = React;

class About extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={{ // Main View
                flex:1,
                paddingTop: 20
            }}>
                <View style={{ // Content View
                    flex:1,
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
                    flex:2,
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
                        position: 'absolute',
                        bottom: 50,
                        right: 10
                    }}>
                    Copyright © nosensezzz. All rights reserved.
                    </Text>
                </View>

            </View>
            
        );
    }
}

module.exports = About;