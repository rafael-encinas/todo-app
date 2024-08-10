import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../todos/todos";

export function SearchBar({ getNewData }){
  const sort = useSelector((state)=>state.todos.sort);
  //const page = useSelector((state)=> state.pagination.page);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState(3);
  const dispatch = useDispatch();

  function handleSubmit(event){
    event.preventDefault();
    console.log("Clicked on searchbar search btn!")
    let textFilter = event.target.elements.textSearch.value;
    let priorityFilter = event.target.elements.prioritySearch.value;
    let stateFilter = event.target.elements.stateSearch.value;
/*
    console.log("Search bar values: ")
    console.log(textFilter);
    console.log(priorityFilter);
    console.log(stateFilter);
*/
    let filters ={
      text: text,
      priority: priorityFilter,
      state: stateFilter,
    }
/*
    console.log("Filters object:");
    console.log(filters);
*/
    dispatch(updateFilters(filters));

     //Hacer GET para obtener todos sorteados
     getNewData();
  }


    return(
      <form id="searchBar" className='searchBar' onSubmit={(e)=> handleSubmit(e)}>
        <div>
          <label htmlFor="textSearch" >Name: </label>
          <input
            name="textSearch"
            id="textSearch"
            type="text"
            placeholder='"Finish To do app!"'
            onChange={e=> setText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="prioritySearch" >Priority: </label>
          <select defaultValue={3} name="prioritySearch" id="prioritySearch"
          onChange={e=> setPriority(e.target.value)}
          >
            <option value="3">All, High, Medium, Low</option>
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="stateSearch" >State: </label>
          <select defaultValue={2} name="stateSearch" id="stateSearch">
            <option value="2">All, Done, Undone</option>
            <option value="1">Done</option>
            <option value="0">Undone</option>
          </select>
        </div>
        <button type="submit" className='searchBtn generalBtn'>Search</button>
      </form>
    );
  }