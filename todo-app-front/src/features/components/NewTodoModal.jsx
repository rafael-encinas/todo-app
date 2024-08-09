import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function NewTodoModal({ toggleModal }){
  //Convertir de div a form, utilizar los datos del form para validacion

  function handleSubmit(event){
    event.preventDefault();
    let textInput = event.target.elements.text.value;
    let priorityInput = event.target.elements.priority.value;
    let dueDateInput = event.target.elements.dueDate.value;
    console.log("Clicked submit!");
    console.log(textInput.length);
    console.log(event.target.elements.priority.value);
    console.log(event.target.elements.dueDate.value);

    let textLengthCheck = false;
    if(textInput.length >= 1 && textInput.length <= 120){
      textLengthCheck = true;
    } else {
      console.log("The number of characters for text should be between 1 and 120, try again.")
    }

    let priorityCheck = false;
    if(priorityInput>=0 && priorityInput<=2){
      priorityCheck = true;
    } else{
      console.log("Priority should be 0, 1, or 2, try again.")
    }

    //if duedate is an empty string, set to null
    if(textLengthCheck && priorityCheck){
      postRequest(textInput,  dueDateInput, priorityInput,);
    }
  }

  function postRequest(text, dueDate, priority){
    console.log("Request for todo creation should happen now!");

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({text: text, dueDate: dueDate, doneState: false, priority: priority})
    };
    fetch('http://localhost:9090/api/todos', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
  }

    return(
      <form className='newToDoModal' onSubmit={(e)=> handleSubmit(e)} >
        <div>New "To Do"</div>
        <div className='inputContainer'>
          <label htmlFor="text">Text: (Maximum 120 characters allowed)</label>
          <textarea name="text" id="text" required maxLength={120} rows={3}></textarea>
        </div>
        <div className='inputContainer'>
        <label htmlFor="priority" >Priority: </label>
          <select name="priority" id="priority" required>
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </select>
        </div>
        <div className='inputContainer'>
          <label htmlFor="dueDate">Due Date:</label>
          <input type="date" name="dueDate" id="dueDate" />
        </div>
        <div className='btnsContainer'>
          <button className='generalBtn' onClick={toggleModal}>Cancel</button>
          <button type='submit' className='generalBtn saveTodoBtn'>Save</button>
        </div>
      </form>
    );
  }
  