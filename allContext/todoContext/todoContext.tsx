import { View, Text } from "react-native";
import React, { createContext, useState } from "react";

const NewTodoContext = createContext({
    todo:[{text:"",id:""}],
    text:"",
    handleAddText:()=>{},
    handleDelete:(id:string)=>{},
    handleEdit:(text:string)=>{},
    updateText:(id:string,text:string)=>{},
    editId:""
})
function TodoContext(props:{children:React.ReactNode}) {
    const [todo,setTodo] = useState<{text:string,id:string}[]>([])
    const [text,setText] = useState("")
    const [editId,setEditId] = useState("")
    const handleAddText = () => {
        if(editId === ""){
            let obj = {
                text,
                id:Date.now().toString()
            }
            setTodo([...todo,obj])
            setText("")
        }else{
            let updateData  = todo.map((item) => {
                if(item.id === editId){
                    return{
                        ...item,
                        text
                    }
                }else{
                    return item
                }
            })
            setTodo(updateData)
            setText("")
            setEditId("")
        }
    }
    const handleDelete = (id:string) => {
        let update = todo.filter((item) => item.id !== id )
        setTodo(update)
    }
    const handleEdit = (text:string) => {
        setText(text)
    }
    const updateText = (id:string,text:string) => {
        setText(text)
        setEditId(id)
    }
  return (
    <NewTodoContext.Provider value={{todo,handleAddText,handleDelete,handleEdit,text,editId,updateText}}>
        {props.children}
    </NewTodoContext.Provider>
  );
}

export {NewTodoContext,TodoContext}
