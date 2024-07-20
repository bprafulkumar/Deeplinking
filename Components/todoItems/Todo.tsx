import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { NewTodoContext } from "../../allContext/todoContext/todoContext";

export default function Todo() {
    const { todo, handleDelete,updateText } = useContext(NewTodoContext);
  return (
    <View>
     {todo&&todo.map((item) => (
                <View key={item.id}>
                    <Text>{item.text}</Text>
                    <Button title="Delete" onPress={() => handleDelete(item.id)} />
                    <Button title="Update" onPress={() => updateText(item.id,item.text)} />
                </View>
            ))}
    </View>
  );
}
