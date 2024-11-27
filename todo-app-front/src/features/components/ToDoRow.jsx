import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateToDoModal } from "./UpdateToDoModal";
import todos from "../todos/todos";


export function ToDoRow({ onGetFilteredData, onDeleteTodo, toDo, onUpdateTodo, onMarkTodo, onUnmarkTodo }){
    const [updateTodoModalState, setUpdateTodoModalState] = useState(false);
    const [todoState, setTodoState] = useState(toDo.doneState)
    const [priorityText, setPriorityText] = useState("Low");
    const page = 1;
    let checked = toDo.doneState?"checked":null;

    function toggleUpdateModal(){
      setUpdateTodoModalState(!updateTodoModalState);
    }

    function deleteTodo(){
      onDeleteTodo(toDo.id);
    }

    function updateTodo(){
      toggleUpdateModal()
    }

    function markDone(){
      if(!todoState){
        onMarkTodo(toDo.id);
      } else {
        onUnmarkTodo(toDo.id);
      }
    }
    return(
      <tr>          
        <td className='colState'>
          <input data-testid='checkbox-test' type="checkbox" name="todoCheckbox" id={toDo.id} defaultChecked={todoState}
           onChange={()=> {
            setTodoState(!todoState);
            markDone();
           }}
          /></td> 
        <td data-testid='text-test'>{toDo.text}</td>  
        <td data-testid='priority-test'>{toDo.priority==0?"Low":toDo.priority==1?"Medium":"High"}</td> 
        <td data-testid='dueDate-test'>{toDo.dueDate!=null?toDo.dueDate:"-"}</td> 
        <td data-testid='modalLocation-test'>
          <button className='generalBtn'
            onClick={updateTodo}
            >
              Edit
          </button>
          {updateTodoModalState? <UpdateToDoModal toggleUpdateModal={toggleUpdateModal} toDo={toDo} onUpdateTodo={onUpdateTodo} /> :null}
          <button className='generalBtn'
            onClick={deleteTodo}
            >
              Delete
          </button>
        </td> 
      </tr>
    );
  }