import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class HomeScreen extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#dfc7fa', '#62497f', '#60497e']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.7}}
        style={styles.linearGradient}>
        <Text style={styles.centerText}>Home Screen</Text>
      </LinearGradient>
    );
  }
}

let styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:-4
  },
  centerText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'PlayfairDisplay-Black',
  },
});
