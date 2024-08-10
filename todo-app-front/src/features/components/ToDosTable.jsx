import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToDoRow } from "./ToDoRow";
import { updateSortByPriority, updateSoryByDate } from "../todos/todos";

export function ToDosTable({ getNewData, todosArr }){
  const dispatch = useDispatch();
  const sort = useSelector((state)=> state.todos.sort);
  //const [priority, setPriority] = useState(1);
  //const [dueDate, setDueDate] = useState(1);
    const rows = [];
    todosArr.forEach((todo)=>{
      rows.push(
        <ToDoRow 
        getNewData={getNewData}
        key = {todo.id}
        toDo = {todo}
        />
      )
    });

    function sortByPriority(){
      //3 states, 0 unclicked, 1 low->high, 2 high->low
      console.log("Priority: " + sort.sortByPriority);

      if(sort.sortByPriority == "high"){
        console.log("Unsorted!");
        dispatch(updateSortByPriority(null));
      }
      else if(sort.sortByPriority == null){
        console.log("Sort low to high!");
        dispatch(updateSortByPriority("low"));
      } else{
        console.log("Sort high to low!");
        dispatch(updateSortByPriority("high"));
      }
      //Hacer GET para obtener todos sorteados
      getNewData();
    }

    function sortByDate(){
      console.log("Clicked on sortByDate!");
      //3 states, 0 unclicked, 1 soon->later, 2 later->soon
      console.log("DueDate: " + sort.sortByDate);
  
      if(sort.sortByDate == "later"){
        console.log("Unsorted!");
        dispatch(updateSoryByDate(null));
      }
      else if(sort.sortByDate == null){
        console.log("Sort soon to later!");
        dispatch(updateSoryByDate("sooner"));
      } else{
        console.log("Sort later to low!");
        dispatch(updateSoryByDate("later"));
      }
      //Hacer GET para obtener todos sorteados
      getNewData();
    }
  
    return(
      <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <td className='colState'>State</td>
            <td className='colName'>Name</td>
            <td className='colPriority'>Priority
              <button onClick={sortByPriority}>
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#e8eaed"><path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"/></svg>
              </button>
              </td>
            <td className='colDueDate'>Due Date
            <button onClick={sortByDate}>
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#e8eaed"><path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"/></svg>
              </button>
            </td>
            <td className='colActions'>Actions</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
    );
  }