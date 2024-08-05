import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomBottomTab from './Navigations/CustomBottomTab';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import SingleProduct from './src/screens/SingleProduct';
import { Linking } from 'react-native';
// import { linking } from './linking';

const Stack = createStackNavigator();

const linking = {
  prefixes: ["https://graphbar.com","graphbar://"],
  config:{
    screens: {
      BottomNavigation: {
        screens: {
          Home: 'home',
          Activities: 'activities',
          Counseling: 'counseling',
          Helpline: 'helpline',
        },
      },
      SingleProduct: 'product/:id',
    },
  },
};
export default class App extends Component {
   handleDeepLink = (event:any) => {
    let { url } = event;
    console.log(url,"===>skdnasd")
  };
  componentDidMount(): void {
    Linking.addEventListener('url', this.handleDeepLink);
  }
  componentWillUnmount() {
    Linking?.removeEventListener('url',this.handleDeepLink);
  }
  render() {
    return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='BottomNavigation'>
          {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} /> */}
          <Stack.Screen name="BottomNavigation" component={CustomBottomTab} />
          <Stack.Screen name ="SingleProduct" component={SingleProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
