import { createSlice } from "@reduxjs/toolkit";

export const searchTextSlice = createSlice({
    name: 'searchText',
    initialState:{
        value: "Placeholder",
        testing: "Should stay the same"
    },
    reducers:{
        appendText: (state, action) =>{
            state.value = action.payload
        },
        modifyTime: (state) =>{
            state.testing = "Changed!"
        }
    }
});

export const {appendText, modifyTime} = searchTextSlice.actions
export default searchTextSlice.reducer