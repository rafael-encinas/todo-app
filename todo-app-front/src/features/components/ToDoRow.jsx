import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ToDoRow({ getNewData, toDo }){
    let checked = toDo.doneState?"checked":null;
    return(
      <tr>          
        <td className='colState'>
          <input type="checkbox" name="" id={toDo.id} checked={toDo.doneState}
            onChange={()=>{console.log("State changed for todo with id: " + toDo.id)}}
          /></td> 
        <td>{toDo.text}</td>  
        <td>{toDo.priority}</td> 
        <td>{toDo.dueDate}</td> 
        <td>
          <button className='generalBtn'
            onClick={()=>{console.log("Clicked on 'Edit' for todo with id: " + toDo.id)}}
            >
              Edit
          </button>
          <button className='generalBtn'
            onClick={()=>{console.log("Clicked on 'Delete' for todo with id: " + toDo.id)}}
            >
              Delete
          </button>
        </td> 
      </tr>
    );
  }