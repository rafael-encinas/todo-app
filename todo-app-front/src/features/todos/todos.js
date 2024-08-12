import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState:{
        data: [],
        filters: {
            text: "",
            priority: 3,
            state: 2,

        },
        sort: {
            sortByPriority: null,
            sortByDate: null,
        },
        metrics: {
            overallAverage: "00:00",
            lowPriorityAverage: "00:00",
            medPriorityAverage: "00:00",
            highPriorityAverage: "00:00",
        },
        sortDateTest: null,
    },
    reducers:{
        updateData: (state, action)=>{
            state.data = action.payload
        },
        updateFilters: (state, action) =>{
            state.filters = action.payload
        },
        updateSortByPriority: (state, action) =>{
            state.sort.sortByPriority = action.payload
        },
        updateSoryByDate: (state, action) =>{
            state.sort.sortByDate = action.payload
        },
        updateMetrics: (state, action) =>{
            state.metrics = action.payload;
        },
        updateSorDateTest: (state, action) =>{
            state.sortDateTest = action.payload;
        }
    }
});

export const {updateData, updateFilters, updateSortByPriority, updateSoryByDate, updateMetrics, updateSorDateTest} = todosSlice.actions
export default todosSlice.reducer