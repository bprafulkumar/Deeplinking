import LottieView from 'lottie-react-native';
import React, { Component } from 'react'
import { StyleSheet} from 'react-native'

interface IState{}
interface IProps{
  navigation?:{
    navigate:(path:string) => void
  }
}
interface SS{}
export default class SplashScreen extends Component<IProps,IState,SS> {
  componentDidMount() {
      setTimeout(() => {
        this.props.navigation?.navigate("Login")
      },3000);
  }
  render() {
    return (
      <LottieView source={require('../assets/animation.json')} autoPlay loop style={styles.mainContainer}/>
    )
  }
}

let styles = StyleSheet.create({
    mainContainer:{flex:1,backgroundColor:"#dfc7fa"},
    linearGradient: {
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
