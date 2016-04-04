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

class Login extends Component {
    constructor(props){
        super(props);
    }

    showAboutus(e){
    	var self = this;
    	self.props.nav.push({
	      name: "About us",
	      index: 99
	    });
    }

    render() {
    	var self = this;
        return (
        	<View style={{
        		flex:1,
        		position: "relative"
        	}}>
	        	<Image 
	            style={styles.backgroundImage} 
	            source={require("../../lib/picture/app_wallpaper_1.jpg")} >
				  
				</Image>
	        	<View style={styles.content}>
				    <View style={{ // Content View
	                        height: screenHeight/2,
	                        width: screenWidth,
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
	                    <Text 
	                    style={{
	                    	fontSize: 20,
	                    	color: "#587894",
	                    	fontWeight: "bold"

	                    }}>
	                    	welcome to Dotability
	                    </Text>
	                </View>
				</View>

				<View 
				  style={{
				  	top: screenHeight/2,
				  	height: screenHeight/2,
	                width: screenWidth,
	                alignItems:'center',
	                justifyContent:'center',
	                paddingBottom: screenHeight/5
				  }}>
					  <View style={styles.buttonContainer}>
			            <TouchableHighlight
			              style={styles.button}>
			                <Text style={{
			                  fontSize:25,
			                  backgroundColor: "transparent",
			                  color:"#FFF",
			                  alignSelf:"center"         
			                }}>
			                  Login
			                </Text>
			              </TouchableHighlight>
			          </View>
			          <View style={styles.buttonContainer}>
			            <TouchableHighlight
			              style={styles.button2}>
			                <Text style={{
			                  fontSize:25,
			                  backgroundColor: "transparent",
			                  color:"#587894",
			                  alignSelf:"center"         
			                }}>
			                  Register
			                </Text>
			              </TouchableHighlight>
			          </View>
			          <View 
			          style={{
		                    alignSelf: "flex-end",
		                    marginRight: 10,
		                    marginTop: 5
		                }}>
		               	  <Text 
				          style={{
				          		color: "#587894",
			                    fontWeight: "bold"
			                }}>
			              want to know more?
				              <Text 
					          style={{
				                    textDecorationLine: "underline",
				                }}
				                onTouchStart={self.showAboutus.bind(self)}>
				              about us
				              </Text>
			              </Text>
		              </View>
	          	</View>
	          	<Text style={{
	          		color: "#587894",
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: 50,
                    right: 0
                }}>
                Copyright © nosensezzz. All rights reserved.
                </Text>
			</View>
        );
    }
}

var styles = StyleSheet.create({
backgroundImage: {
	flex: 1,
	alignSelf: 'stretch',
	width: screenWidth,
	height: screenHeight,
	opacity: 0.4,
	position: "absolute",
	left: 0,
	top: 0
},

content: {
	position: "absolute",
	left: 0,
	top: 0,
	flex: 1,
	//backgroundColor: "red",
	height: screenHeight,
	width: screenWidth,
	paddingTop: 20
},

button:{
    flex: 1,
    backgroundColor:"#587894",
    alignSelf:"stretch",
    justifyContent: "center",
    borderRadius:5,
    borderColor:"#587894",
},
button2:{
    flex: 1,
    backgroundColor:"transparent",
    alignSelf:"stretch",
    justifyContent: "center",
    borderRadius:5,
    borderWidth: 2,
    borderColor:"#587894",
},

buttonContainer:{
	width: screenWidth-20, 
	height: 40, 
	marginTop: 10,
	alignSelf: "center"
},
});

module.exports = Login;