import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState:{
        data: [
            {id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et efficitur risus. Nulla varius vehicula massa, sus.", dueDate: "2024-08-12", doneState: false, doneDate:null, priority: 2, creationDate: "2024/07/29 09:58:33"},
            {id: 2, text: "This is data from the store!", dueDate: null, doneState: true, doneDate: "2022-02-01  09:58:32", priority: 0, creationDate: "2022/01/15  09:58:33"},
            {id: 3, text: "Task 3", dueDate: "2022-02-02", doneState: false, doneDate: null, priority: 2, creationDate: "2022-01-18  09:58:32"},
            {id: 4, text: "Task 4", dueDate: "2023-02-02", doneState: false, doneDate: null, priority: 1, creationDate: "2022-01-04  09:58:32"},
            {id: 5,text: "The quick brown fox jumps over the lazy dog", dueDate: null, doneState: false, doneDate: null, priority: 1, creationDate: "2024-08-08 09:58:32"},
            {id: 6,text: "This is different!", dueDate: null, doneState: false, doneDate: null, priority: 1, creationDate: "2024-08-08 09:58:32"},
            {id: 7, text: "Task 7", dueDate: "2022-02-02", doneState: false, doneDate: null, priority: 2, creationDate: "2022-01-18  09:58:32"},
            {id: 8, text: "Task 8", dueDate: "2023-02-02", doneState: false, doneDate: null, priority: 1, creationDate: "2022-01-04  09:58:32"},
            {id: 9,text: "The quick brown fox jumps over the lazy dog", dueDate: null, doneState: false, doneDate: null, priority: 0, creationDate: "2024-08-08 09:58:32"},
            {id: 10,text: "This is different!", dueDate: null, doneState: false, doneDate: null, priority: 0, creationDate: "2024-08-08 09:58:32"},
          ],
        filters: {
            text: "",
            priority: 3,
            state: 2,

        },
        prioritySort: {
            sortByPriority: null,
            sortByDate: null,
        },
        metrics:{
            overallAverage: "00:00",
            lowPriorityAverage: "00:00",
            medPriorityAverage: "00:00",
            highPriorityAverage: "00:00",
        },
    },
    reducers:{
        updateData: (state, action)=>{
            state.data = action.payload
        },
        updateFilters: (state, action) =>{
            state.filters = action.payload
        },
        updatePriority: (state, action) =>{
            state.prioritySort = action.payload
        }
    }
});

export const {updateData, updateFilters, updatePriority} = todosSlice.actions
export default todosSlice.reducer