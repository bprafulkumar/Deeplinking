import React, {Component} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class HomeScreen extends Component<any,any,any> {
  constructor(props:any){
    super(props)
    this.state = {
      productDetails :[]
    }
  }
  handleApiCall = async() =>{
    let productApiCall = await fetch("https://jsonplaceholder.typicode.com/posts")
    let jsonData =  await productApiCall.json()
    this.setState({productDetails:jsonData})
  }
  componentDidMount(): void {
      this.handleApiCall()
  }
  render() {
    return (
     <SafeAreaView style={{flex:1}}>
       <LinearGradient
        colors={['#dfc7fa', '#62497f', '#60497e']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.7}}
        style={styles.linearGradient}>
        <Text style={styles.centerText}>Home Screen</Text>
        <FlatList 
          data={this.state.productDetails}
          keyExtractor={(item) =>item.id.toString() }
          maxToRenderPerBatch={10}
          initialNumToRender={5}
          windowSize={100}
          renderItem={({item,index}) =>{
            return(
              <TouchableOpacity style={{backgroundColor:"grey",padding:20,marginTop:10,borderRadius:20}} onPress={() => this.props.navigation.navigate("SingleProduct",{products:item})}>
                <Text style={{color:"white",fontSize:18,textTransform:"capitalize",textAlign:"justify"}}>{item.id} :- {item.body}</Text>
              </TouchableOpacity>
            )
          }}
        />
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
    marginBottom:-4
  },
  centerText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'PlayfairDisplay-Black',
  },
});
