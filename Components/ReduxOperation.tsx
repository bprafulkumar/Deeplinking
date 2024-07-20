import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { AppDispatch, RootState } from '../redux/Store'
import { connect } from 'react-redux'
import {CountReducer} from '../redux/reducer/CountReducer'

interface IProps{
    loading:boolean
    CountReducer:() =>void
}

interface IState {}

interface SS {}
class Count extends Component<IProps,IState,SS> {
    constructor(props:IProps){
        super(props)
    }
    componentDidMount() {
        console.log(this.props,"====CountReducer")
    }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button title='heeh' onPress={() => this.props.CountReducer()}/>
      </View>
    )
  }
}

const mapStateToProps = (state:RootState) => {
    return{
        loading : state.CountReducer.loading
    }
}
const mapDispatchToProps = {
  CountReducer
}

export default connect(mapStateToProps,mapDispatchToProps)(Count)