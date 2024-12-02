import React from "react";

export function NewTodoModal({ onAddTodo, toggleModal }) {
  function handleSubmit(event) {
    event.preventDefault();
    let textInput = event.target.elements.text.value;
    let priorityInput = event.target.elements.priority.value;
    let dueDateInput = event.target.elements.dueDate.value;

    let textLengthCheck = false;
    if (textInput.length >= 1 && textInput.length <= 120) {
      textLengthCheck = true;
    } else {
        alert(
          "The number of characters for text should be between 1 and 120, try again."
        );
    }

    let priorityCheck = false;
    if (priorityInput >= 0 && priorityInput <= 2) {
      priorityCheck = true;
    } else {
        alert("Priority should be 0, 1, or 2, try again.");
    }

    if (dueDateInput.length <= 0) {
      dueDateInput = null;
    }

    //if duedate is an empty string, set to null
    if (textLengthCheck && priorityCheck) {
      onAddTodo(textInput, dueDateInput, priorityInput);
      //alert("To Do created successfully!")
      toggleModal();
    }
  }

  return (
    <form className="newToDoModal" onSubmit={(e) => handleSubmit(e)}>
      <div>New "To Do"</div>
      <div className="inputContainer">
        <label htmlFor="text">Text: (Maximum 120 characters allowed)</label>
        <textarea
          name="text"
          id="text"
          required
          maxLength={120}
          rows={3}
          placeholder="Finish project!"
        ></textarea>
      </div>
      <div className="inputContainer">
        <label htmlFor="priority">Priority:</label>
        <select name="priority" id="priority" required>
          <option value="0">Low</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select>
      </div>
      <div className="inputContainer">
        <label htmlFor="dueDate">Due Date:</label>
        <input type="date" name="dueDate" id="dueDate" />
      </div>
      <div className="btnsContainer">
        <button type="button" className="generalBtn" onClick={toggleModal}>
          Cancel
        </button>
        <button type="submit" className="generalBtn saveTodoBtn">
          Save
        </button>
      </div>
    </form>
  );
}
