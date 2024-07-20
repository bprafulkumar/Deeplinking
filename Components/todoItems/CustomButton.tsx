import { View, Text, TextInput, Button } from "react-native";
import React, { useContext } from "react";
import { NewTodoContext } from "../../allContext/todoContext/todoContext";

export default function CustomButton() {
    const { handleAddText, handleEdit,text,editId } = useContext(NewTodoContext);
  return (
    <View style={{width:"100%",margin:20}}>
       <TextInput
                placeholder="Add new todo"
                onChangeText={(text) => handleEdit(text)}
                style={{borderWidth:1,width:300,marginBottom:20}}
                value={text}
            />
            <View style={{marginBottom:20}}>
              <Button title={editId ===""?"Add Todo":"Update"} onPress={handleAddText} />
            </View>
    </View>
  );
}
