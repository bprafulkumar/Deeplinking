import React, {Component} from 'react';
import {
  Alert,
  SafeAreaView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class SingleProduct extends Component<any, any, any> {
  constructor(props:any){
    super(props)
    this.state = {
      productDetails :null
    }
  }
  onShare = async (id: string) => {
    try {
      const result = await Share.share({
        message: `https://graphbar.com/product/${id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  handleApiCall = async() =>{
    console.log(this.props.route,"===>>>params---2222")
    console.log(this.props.route.params,"===>>>params---111")
    // let productApiCall = await fetch("https://jsonplaceholder.typicode.com/posts")
    // let jsonData =  await productApiCall.json()
    // this.setState({productDetails:jsonData})
    // let items = jsonData.find((item:any) => item.id === id)

  }
  componentDidMount(): void {
      this.handleApiCall()
  }

  render() {
    const productDetails = this.props.route?.params?.products;
    return (
      <SafeAreaView>
        <View
          style={{
            backgroundColor: 'grey',
            padding: 20,
            marginTop: 10,
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              textTransform: 'capitalize',
              textAlign: 'justify',
            }}>
            {productDetails.id} :- {productDetails.body}
          </Text>
          <TouchableOpacity onPress={() => this.onShare(productDetails.id)}>
            <Text>Send Url To Open this product</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
