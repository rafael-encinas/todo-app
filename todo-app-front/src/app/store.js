import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice"
import searchTextReducer from "../features/searchText/searchTextSlice"
import todosReducer from "../features/todos/todos"

export default configureStore({
    reducer: {
        counter: counterReducer,
        searchText: searchTextReducer,
        todos: todosReducer,
    },
})