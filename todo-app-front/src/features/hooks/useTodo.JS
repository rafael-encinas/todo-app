import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export function useTodo(){
    const filters = useSelector((state)=> state.todos.filters);
    const sort = useSelector((state)=> state.todos.sort);
    const page = useSelector((state)=> state.pagination.requestPage.page);
    const dispatch = useDispatch();

    //Only runs one time for initial rendering, gets all todos with no filters
    useEffect(()=>{
        fetch(`http://localhost:9090/api/todos`, requestOptions)
        .then(response=>response.json())
        .then(data=> {
          console.log(data);
          dispatch(updateData(data.data));
          dispatch(updateMetrics(data.metrics));
          dispatch(updatePagination(data.pagination));
        })
    }, [0]);

    const onGetFilteredData = (filters, sort, page)=>{
        //Filters, sort, and page should come from invocation

        let requestString = `page=${page}&priority=${filters.priority}&state=${filters.state}&text=${filters.text}`;
        if(sort.sortByPrioirty != null){
        requestString += `&sortByPriority=${sort.sortByPrioirty}`;
        }

        if(sort.sortByDate != null){
        requestString += `&sortByDate=${sort.sortByDate}`;
        }

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
          }
        fetch(`http://localhost:9090/api/todos?${requestString}`, requestOptions)
        .then(response=>response.json())
        .then(data=> {
          console.log(data);
          dispatch(updateData(data.data));
          dispatch(updateMetrics(data.metrics));
          dispatch(updatePagination(data.pagination));
        })
    }

    //Post todo to API
    const onAddTodo = ((text, dueDate, priority) =>{
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({text: text, dueDate: dueDate, doneState: false, priority: priority})
          };
          fetch('http://localhost:9090/api/todos', requestOptions)
              .then(response => response.json())
              .then(data => console.log(data));
    })

    return { onGetFilteredData, onAddTodo }

    //const 
        
}