import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Activities extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <LinearGradient
          colors={['#dfc7fa', '#62497f', '#60497e']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.7}}
          style={styles.linearGradient}>
          <Text style={styles.centerText}>Activities Screen</Text>
        </LinearGradient>
      </SafeAreaView>
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
    marginBottom: -4,
  },
  centerText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'PlayfairDisplay-Black',
  },
});
