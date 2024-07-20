import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface initialStateProps{
    loading:boolean
    CountReducer?:() =>void
}
const initialState:initialStateProps = {
    loading:false,
}
export const CountReducer = createAsyncThunk("CountReducer",async(_,{getState,fulfillWithValue,rejectWithValue}) => {
    let countApiCall = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    let data = await countApiCall.json()
    if(data){
        return fulfillWithValue(data)
    }else{
        return rejectWithValue("Something went wrong")
    }
})

export const countSlice = createSlice({
    name:"CountSlice",
    initialState,
    reducers:{
        resetLoading:(state) => {
            state.loading = false
        }
    },
    extraReducers:(builder) => {
        builder.addCase(CountReducer.pending,(state,action) => {
            state.loading = true
        })  
        builder.addCase(CountReducer.fulfilled,(state,action) => {
            state.loading = false
            console.log(action.payload,"====>>>>>>>>action")
        })
        builder.addCase(CountReducer.rejected,(state,action) => {
            state.loading = false
        })
    }
})
export default countSlice.reducer
export const {resetLoading} = countSlice.actions