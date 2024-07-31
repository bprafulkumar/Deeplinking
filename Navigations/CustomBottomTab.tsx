import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../src/screens/HomeScreen';
import Activities from '../src/screens/Activities';
import Counseling from '../src/screens/Counseling';
import Helpline from '../src/screens/Helpline';
import BottomTabCustom from './BottomTabCustom';

const Tab = createBottomTabNavigator();

export default class CustomBottomTab extends Component {
  render() {
    return (
    <Tab.Navigator screenOptions={{headerShown:false}} tabBar={(props) => <BottomTabCustom  {...props}/>}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Activities" component={Activities} />
        <Tab.Screen name="Counseling" component={Counseling} />
        <Tab.Screen name="Helpline" component={Helpline} />
      </Tab.Navigator>
    )
  }
}
