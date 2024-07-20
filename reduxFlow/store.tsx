import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from  "./reducers/TodoSlice"
const store = configureStore({
    reducer:{
        TodoSlice
    }
})

export default store

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>