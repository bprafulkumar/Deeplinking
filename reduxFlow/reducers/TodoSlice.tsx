import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store from "../store";


export interface ProductDetails{
    "id": number
    "name": string
    "price": number
    "quantity": number
    "description": string
    "sub_categories": string
    "category": {
        "id":number
        "name": string
    },
    "average_rating":number
    "is_in_cart": boolean
    "is_in_wishlist": boolean
    "count_in_cart":number
    "is_promoted": boolean
    "is_visible": boolean
    "product_id":string
}
interface InitialState{
    todos : {
        text : string
        id:string
    }[],
    inputText:string
    editId:string
    token:string
    loading:boolean
    productsData:ProductDetails[]
    totalPages:number
}
const initialState:InitialState = {
    todos : [],
    inputText:"",
    editId:"",
    token:"",
    loading:false,
    productsData : [],
    totalPages:1
}
const baseUrl = "http://122.175.39.120:4002"
export const loginUser = createAsyncThunk(
    "loginUser",
    async(_,{getState,fulfillWithValue,rejectWithValue}) => {
        let loginUser = await fetch(`${baseUrl}/api/v1/users/sign_in`,{
            method:"POST",
            body:JSON.stringify({
                "user": {
                      "login": "sunny@gmail.com",
                      "password": "Sunny@123",
                      "fcm_token": "asa"
                }
              }
              ),
            headers:{
                "Content-Type": "application/json"
            },
        })
        let userToken = await loginUser.json()
        if(userToken){
           return fulfillWithValue(userToken.token)
        }else{
           return rejectWithValue("Something went wrong")
        }
    })
export const getProducts = createAsyncThunk(
    "getProducts",
    async({currentPage}:{currentPage:number},{getState,fulfillWithValue,rejectWithValue}) => {
        let token = store.getState().TodoSlice.token
        let products = await fetch(`${baseUrl}/api/v1/products?page=${currentPage}`,{
            method:"GET",
            headers:{
                token:token
            }
        })
        let finalProductData = await products.json()
        if(finalProductData){
            return fulfillWithValue(finalProductData)
        }else{
            return rejectWithValue("Something went wrong")
        }
    })
const TodoSlice = createSlice({
    name:"TodoSlice",
    initialState,
    reducers:{
        AddTodo:(state) => {
            const obj = {
                text : state.inputText,
                id:Date.now().toString()
            }
            state.todos = [...state.todos,obj]
            state.inputText = ""
        },
        DeleteTodo:(state,action) => {
            let updateTodos = state.todos.filter((item) => item.id !==action.payload)
            state.todos  = updateTodos
        },
        HandleText:(state,action) => {
            state.inputText = action.payload
        },
        EditTodo:(state,action) => {
            state.inputText = action.payload.text
            state.editId = action.payload.editId
        },
        updateTodo:(state,action) => {
            let updateText = state.todos.map((item) =>  item.id === action.payload.editId ? {...item,text: action.payload.text} :item)
            state.todos = updateText
            state.inputText = ""
            state.editId = ""
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending,(state,action) =>{
            state.loading = true
        })
        .addCase(loginUser.fulfilled,(state,action) =>{
            state.loading = false
            state.token = action.payload
        })
        .addCase(loginUser.rejected,(state,action) =>{
            state.loading = true
        })
        .addCase(getProducts.pending,(state,action) =>{
            state.loading = true
        })
        .addCase(getProducts.fulfilled,(state,action) =>{
            state.loading = false
            // console.log(action.payload.products,"==>>>>action.payload.products")
            state.productsData = action.payload.products
            state.totalPages = action.payload.total_pages
        })
        .addCase(getProducts.rejected,(state,action) =>{
            state.loading = true
        })
    }
})

export default TodoSlice.reducer
export const {AddTodo,DeleteTodo,HandleText,EditTodo,updateTodo} = TodoSlice.actions