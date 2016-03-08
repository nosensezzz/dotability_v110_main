var React = require('react-native');
var Overlay = require('react-native-overlay');

var {
  View,
  ActivityIndicatorIOS,
  StyleSheet,
  TouchableOpacity,
  Text,
} = React;

type Props = {
  isVisible: boolean;
}

var Toast = React.createClass({
  render(): ReactElement {
    var positionStyle;

    if (this.props.position == 'top_success' || !this.props.position) {
      positionStyle = styles.top_success;
    } else if(this.props.position == 'top_warning'){
      positionStyle = styles.top_warning;
    } else if(this.props.position == 'top_error'){
      positionStyle = styles.top_error;
    }

    return (
      <Overlay isVisible={this.props.isVisible} aboveStatusBar={false}>
        <View style={positionStyle} blurType="light">
          <View style={styles.content}>
            {this.props.children}
          </View>

          <TouchableOpacity onPress={this.props.onDismiss}>
            <View style={styles.dismissButton}>
              <Text style={styles.dismissButtonText}>Okay</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }
});

var styles = StyleSheet.create({
  top_success: {
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:"#00EC00",
    marginTop:20
  },

  top_warning: {
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:"yellow",
    marginTop:20,
    //opacity: 0.1
  },

  top_error: {
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:"red",
    marginTop:20
  },

  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 9,
  },
  dismissButton: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
    height: 30,
    marginRight: 15,
    alignItems: 'center',
  },
  dismissButtonText: {
    color: '#888888',
    fontSize: 12,
  },
})

module.exports = Toast;