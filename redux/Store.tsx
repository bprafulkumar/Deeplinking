import { configureStore } from "@reduxjs/toolkit";
import CountReducer from  "./reducer/CountReducer"
const store = configureStore({
    reducer:{
        CountReducer
    }
})

export default store


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;