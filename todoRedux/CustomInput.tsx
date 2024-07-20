import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../reduxFlow/store";
import { AddTodo, HandleText, updateTodo } from "../reduxFlow/reducers/TodoSlice";

export default function CustomInput() {
  const dispatch = useDispatch<AppDispatch>()
  const inputValue = useSelector((value:AppState) => value.TodoSlice.inputText)
  const editId = useSelector((value:AppState) => value.TodoSlice.editId)
  const textVaue = useSelector((value:AppState) => value.TodoSlice.inputText)
  return (
    <View>
      <TextInput value={inputValue} onChangeText={(text) => dispatch(HandleText(text))} placeholder="Enter Text" style={{width:"90%",borderWidth:1,margin:10}} />
      {/* <TouchableOpacity style={{backgroundColor:"#000000",padding:10,marginHorizontal:20,alignSelf:"center"}} onPress={() => dispatch(AddTodo())}>
        <Text style={{color:"white"}}>Add Todo</Text>
       </TouchableOpacity> */}
       {
        editId == "" ?  <TouchableOpacity style={{backgroundColor:"#000000",padding:10,marginHorizontal:20,alignSelf:"center"}} onPress={() => dispatch(AddTodo())}>
        <Text style={{color:"white"}}>Add Todo</Text>
       </TouchableOpacity> :  <TouchableOpacity style={{backgroundColor:"#000000",padding:10,marginHorizontal:20,alignSelf:"center"}} onPress={() => dispatch(updateTodo({editId:editId,text:textVaue}))}>
        <Text style={{color:"white"}}>Update</Text>
       </TouchableOpacity>
      }
    </View>
  );
}
