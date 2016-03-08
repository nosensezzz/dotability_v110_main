'use strict';

var React = require('react-native'),

{
  StyleSheet,
  Image
} = React;

var Dimensions = require('Dimensions'),
	  screenWidth = Dimensions.get('window').width;

var style = StyleSheet.create({
  container:{
    flex:1,
    padding:0,
    marginBottom: 40,
    backgroundColor: "#F5F5F5"
  },
  scrollContainer:{
    flex:1
  },
  carouselContainer: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

module.exports = style;