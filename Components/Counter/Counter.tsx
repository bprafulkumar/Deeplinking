import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { CounterContext } from '../../allContext/contextApi/CounterContext'

export default class Counter extends Component {
    static contextType = CounterContext
  render() {
    const { count, increment, decrement }:any = this.context;
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Button title='INCREMENT' onPress={increment}/>
        <Text style={{marginVertical:10,fontSize:90}}> {count} </Text>
        <Button title='DECREMENT' onPress={decrement}/>
      </View>
    )
  }
}
