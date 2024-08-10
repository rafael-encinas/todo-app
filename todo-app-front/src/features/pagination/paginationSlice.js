import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState:{
        pagination: {
            total_records: 0,
            total_filtered: 0,
            current_page: 1,
            total_pages:1,
            next_page: -1,
            prev_page: -2
        },
        requestPage: {
            page: 1
        },
    },
    reducers:{
        updatePagination: (state, action)=>{
            state.pagination = action.payload
        },
        updateRequestPage: (state, action)=>{
            state.requestPage = action.payload
        }
    }
});

export const {updatePagination, updateRequestPage} = paginationSlice.actions
export default paginationSlice.reducer