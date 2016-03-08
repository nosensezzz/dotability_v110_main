'use strict';

var React = require('react-native'),

{
  StyleSheet,
  Image
} = React;

var Dimensions = require("Dimensions"),
    screenWidth = Dimensions.get('window').width,
    screenHeight = Dimensions.get('window').height;


var style = StyleSheet.create({
  container:{
    flex:1,
    width: screenWidth,
    paddingTop: 64
  },

  search_container:{
    flex:1,
    paddingTop: 64,
    padding:5
  },

  flex_column:{
    flexDirection: "column"
  },

  flex_row:{
    flexDirection: "row"
  },

  container_border:{
    backgroundColor: "#D6D6D6",
    height:2,
    width:screenWidth
  },

  app_backgroundcolor:{
    backgroundColor:"#F5F5F5"
  },

  app_err_msg:{
    color:"red",
    marginTop:20,
    fontSize: 15
  },

  carouselImage:{ 
    justifyContent: 'center', 
    flex: 1,
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    resizeMode: "stretch", 
    height:window.height,
    width:window.width
  },

  backgroundIcon:{
    justifyContent: 'center', 
    flex: 1,
    //position: 'absolute',
    //top: 0, bottom: 0, left: 0, right: 0,
    resizeMode: "stretch", 
    height:window.height,
    width:window.width,
    //backgroundColor:"",
    //borderRadius:30
  },

  bgImageWrapper: {
      position: 'absolute',
      top: 0, bottom: 0, left: 0, right: 0
  },

  scroll_container:{
    flex:1,
    marginTop:64,
    width: screenWidth
  },

  title:{

  },

  input:{
    height:55,
    marginTop:10,
    padding:5,
    fontSize:20,
    borderWidth:1,
    borderColor:"#48bbec"
  },

  button:{
    height:55,
    marginTop:10,
    backgroundColor:"#48bbec",
    alignSelf:"stretch",
    justifyContent: "center"
  },
  buttonText:{
    fontSize:25,
    color:"#FFF",
    alignSelf:"center"
  },
  errMsg:{
    color:"red",
    paddingTop:10
  },

  bold:{
    fontWeight: "bold"
  },
  hyperlink:{
    color:"#278CFF",
  },
  // search
  button_text_view:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "center"
  },

  search_loadingicon:{
    marginLeft:30
  },

  history_container:{
    marginTop:10,
    marginBottom:10
  },

  // found-user
  find_user_container:{
    flex:1,
    marginTop: 64
  },

  find_user_userinfo_container:{
    width:(screenWidth),
    height: (screenHeight/4),
    position: "relative"
  },

  find_user_userinfo_avatar: {
    position: "absolute",
    width:70,
    height:70,
    bottom:25,
    left:10,
    borderColor:"white",
    borderWidth: 2
  },

  find_user_userinfo_username:{
    flexDirection:"column",
    backgroundColor: 'transparent',
    left:85,
    bottom:40,
    position:"absolute"
  },

  find_user_userinfo_location:{
    backgroundColor: 'transparent',
    left:10,
    bottom:5,
    position:"absolute"
  },
  find_user_userinfo_times:{
    backgroundColor: 'transparent',
    right:10,
    top:5,
    position:"absolute",
    flexDirection:"column"
  },

  founduser_loadingicon:{
    marginTop: 30
  },
  // found match
  foundmatch_teamtitle:{
    marginTop: 40,
    fontSize:18
  },

  found_match_desc_row:{
    borderRadius: 10,
    flexDirection:"row",
    marginTop:5,
    marginBottom:10,
    flex:1
  },

  found_match_desc_row_text:{
    flex:1,
    textAlign: "right",
    fontSize:15
  },

  found_match_desc_row_label:{
    flex:1,
    textAlign: "left",
    fontSize:15
  },

  found_match_desc_row_item_text_title:{
    flex:1,
    borderRadius: 10,
    fontSize: 17,
    fontWeight: "bold"
  },

  // home - modules
  home_modules_container:{
    flex:1,
    flexDirection:"column",
    margin:10
  },
  home_section_title:{
    flexDirection:"row",
    alignItems:"center",
    paddingBottom:5,
    paddingLeft:2
  },

  home_modules_row:{
    flex:1,
    flexDirection:"row"
  },

  home_modules_module:{
    width: (screenWidth/2 - 10),
    height: (screenWidth/3),
    paddingTop: (screenWidth/16),
    paddingBottom:(screenWidth/16),
    paddingLeft: (screenWidth/8),
    paddingRight: (screenWidth/8),
    borderWidth:1,
    borderColor:"#F5F5F5",
    backgroundColor:"white"
  },

   home_modules_module_text:{
    alignItems:"center"
  },

  // general
  subTitle:{
    fontSize: 18,
    fontWeight:"bold",
    alignItems: 'center',
    paddingTop:10
  },
  fontwhite:{
    color:"white"
  }
});

module.exports = style;