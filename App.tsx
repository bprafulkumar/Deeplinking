import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomBottomTab from './Navigations/CustomBottomTab';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="BottomNavigation" component={CustomBottomTab} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
