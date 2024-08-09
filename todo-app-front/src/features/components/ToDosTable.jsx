import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToDoRow } from "./ToDoRow";

export function ToDosTable({ todosArr }){
    const rows = [];
    todosArr.forEach((todo)=>{
      rows.push(
        <ToDoRow 
        key = {todo.id}
        toDo = {todo}
        />
      )
    });
  
    return(
      <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <td className='colState'>State</td>
            <td className='colName'>Name</td>
            <td className='colPriority'>Priority <button>^</button></td>
            <td className='colDueDate'>Due Date <button>^</button></td>
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