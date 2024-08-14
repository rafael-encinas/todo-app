import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToDoRow } from "./ToDoRow";
import { updateSortByPriority, updateSoryByDate, updateSorDateTest } from "../todos/todos";

export function ToDosTable({ onGetFilteredData, onDeleteTodo, todosArr, onUpdateTodo, onMarkTodo, onUnmarkTodo }){
  const dispatch = useDispatch();
  //const sort = useSelector((state)=> state.todos.sort);
  const filters = useSelector((state) => state.todos.filters);
  const page = useSelector((state)=> state.pagination.requestPage.page);
  const [priority, setPriority] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [dueDateTest, setDueDateTest] = useState("change due date test!");
  const [sortByPriorityButtonText, setSortByPriorityButtonText] = useState("Unsorted")
  const [sortByDueDateButtonText, setSortByDueDateButtonText] = useState("Unsorted")
    const rows = [];
    todosArr.forEach((todo)=>{
      rows.push(
        <ToDoRow 
        onGetFilteredData={onGetFilteredData}
        key = {todo.id}
        toDo = {todo}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodo={onUpdateTodo}
        onMarkTodo={onMarkTodo}
        onUnmarkTodo={onUnmarkTodo}
        />
      )
    });

    //<svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#e8eaed"><path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"/></svg>
                

    function sortByPriority(){
      //3 states, 0 unclicked, 1 low->high, 2 high->low
      //console.log("Priority: " + sort.sortByPriority);

      dispatch(updateSorDateTest(dueDateTest));

      if(priority == "high"){
        console.log("Unsorted!");
        setPriority(null);
        dispatch(updateSortByPriority(null));
        setSortByPriorityButtonText("Unsorted")

        let sort= {
          sortByPriority: null,
          sortByDate: dueDate,
        }
        onGetFilteredData(filters, sort, page);
      }
      else if(priority == null){
        console.log("Sort low to high!");
        setPriority("low");
        dispatch(updateSortByPriority("low"));
        setSortByPriorityButtonText("Low to high")

        let sort= {
          sortByPriority: "low",
          sortByDate: dueDate,
        }
        onGetFilteredData(filters, sort, page);
      } else{
        console.log("Sort high to low!");
        setPriority("high")
        dispatch(updateSortByPriority("high"));
        setSortByPriorityButtonText("High to low")

        let sort= {
          sortByPriority: "high",
          sortByDate: dueDate,
        }
        onGetFilteredData(filters, sort, page);
      }
    }

    function sortByDate(event){
      event.preventDefault();
      //3 states, 0 unclicked, 1 soon->later, 2 later->soon
      //console.log("DueDate: " + sort.sortByDate);
  
      if(dueDate == "later"){
        setDueDate(null);
        console.log("Unsorted!");
        dispatch(updateSoryByDate(null));
        setSortByDueDateButtonText("Unsorted")
        let sort= {
          sortByPriority: priority,
          sortByDate: null,
        }
        onGetFilteredData(filters, sort, page);
      }
      else if(dueDate == null){
        setDueDate("sooner");
        console.log("Sort soon to later!");
        dispatch(updateSoryByDate("sooner"));
        setSortByDueDateButtonText("Sooner");
        let sort= {
          sortByPriority: priority,
          sortByDate: "sooner",
        }
        onGetFilteredData(filters, sort, page);
      } else{
        setDueDate("later");
        console.log("Sort later to low!");
        dispatch(updateSoryByDate("later"));
        setSortByDueDateButtonText("Later");
        let sort= {
          sortByPriority: priority,
          sortByDate: "later",
        }
        onGetFilteredData(filters, sort, page);
      }
      //Hacer GET para obtener todos sorteados

      /*
      let sort= {
        sortByPriority: priority,
        sortByDate: dueDate,
      
      onGetFilteredData(filters, sort, page);

      */
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
                {sortByPriorityButtonText}
              </button>
              </td>
            <td className='colDueDate'>Due Date
            <form action="" onSubmit={sortByDate}>
              <button type="submit" >
                {sortByDueDateButtonText}
              </button>
            </form>
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