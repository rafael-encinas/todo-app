import { createSlice } from "@reduxjs/toolkit";
import { React } from "react";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state)=>{
            state.value += 1
        },
        decrement: (state)=>{
            state.value -= 1
        },
        incrementByAmout: (state, action) =>{
            state.value += action.payload
        },
    },
});

export const {increment, decrement, incrementByAmout} = counterSlice.actions
export default counterSlice.reducer