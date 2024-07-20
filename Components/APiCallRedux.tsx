import { View, Text, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import {CountReducer} from "../redux/reducer/CountReducer";

export default function Count2() {
    const dispatch = useDispatch<AppDispatch>()
    const getState = useSelector<RootState>((state) => console.log(state,"===state"))
  return (
    <View>
      <Text>Count2</Text>
      <Button title="Call For func" onPress={() => {
        dispatch(CountReducer())
      }}/>
    </View>
  );
}
