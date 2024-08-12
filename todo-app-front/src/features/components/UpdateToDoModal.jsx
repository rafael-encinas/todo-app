import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function UpdateToDoModal({ toggleUpdateModal, toDo, onUpdateTodo }){
  //Convertir de div a form, utilizar los datos del form para validacion
  //const { onAddTodo } = useTodo();

  const [text, setText] = useState(toDo.text);
  const [priority, setPriority] = useState(toDo.priority);
  const [dueDate, setDueDate] = useState(toDo.dueDate);

  const filters = useSelector((state)=> state.todos.filters);
  const sort = useSelector((state)=> state.todos.sort);
  const page = useSelector((state)=> state.pagination.requestPage.page);
  

  console.log("DueDate for todo with id: "+ toDo.id + " -> " + dueDate);

  function handleSubmit(event){
    event.preventDefault();
    let textInput = event.target.elements.text.value;
    let priorityInput = event.target.elements.priority.value;
    let dueDateInput = event.target.elements.dueDate.value;

    let textLengthCheck = false;
    if(text.length >= 1 && textInput.length <= 120){
      textLengthCheck = true;
    } else {
      console.log("The number of characters for text should be between 1 and 120, try again.")
    }

    let priorityCheck = false;
    if(priority>=0 && priorityInput<=2){
      priorityCheck = true;
    } else{
      console.log("Priority should be 0, 1, or 2, try again.")
    }

    //if duedate is an empty string, set to null
    if(dueDateInput.length<=0){
      setDueDate(null);
    } else {
      setDueDate(dueDateInput);
    }

    if(textLengthCheck && priorityCheck){
      //setDueDate("1111-22-33")
      //console.log(dueDate);
      console.log("DueDate from modal: " + dueDate);
      onUpdateTodo(text, dueDate, priority, toDo.id);

      toggleUpdateModal();
    }
  }

    return(
      <form className='newToDoModal' onSubmit={(e)=> handleSubmit(e)} >
        <div>Update "To Do"</div>
        <div className='inputContainer'>
          <label htmlFor="text">Text: (Maximum 120 characters allowed)</label>
          <textarea name="text" id="text" required maxLength={120} rows={3} value={text} onChange={e=> setText(e.target.value)} ></textarea>
        </div>
        <div className='inputContainer'>
        <label htmlFor="priority" >Priority: </label>
          <select name="priority" id="priority" value={priority} onChange={e=> setPriority(e.target.value)} required>
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </select>
        </div>
        <div className='inputContainer'>
          <label htmlFor="dueDate">Due Date:</label>
          <input type="date" value={dueDate == null? "": dueDate} name="dueDate" id="dueDate" onChange={e=> setDueDate(e.target.value)} />
        </div>
        <div className='btnsContainer'>
          <button className='generalBtn' onClick={toggleUpdateModal}>Cancel</button>
          <button type='submit' className='generalBtn saveTodoBtn'>Save</button>
        </div>
      </form>
    );
  }
  