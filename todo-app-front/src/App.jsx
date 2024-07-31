import { useState } from 'react'
//import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'





function SearchBar(){

  return(
    <form className='searchBar'>
      <div>
        <label >Name: </label>
        <input type="text" placeholder='Text' />
      </div>
      <div>
        <label >Priority: </label>
        <select name="" id="">
          <option value="">All, High, Medium, Low</option>
          <option value="">High</option>
          <option value="">Medium</option>
          <option value="">Low</option>
        </select>
      </div>
      <div>
        <label >State: </label>
        <select name="" id="">
          <option value="">All, Done, Undone</option>
          <option value="">Done</option>
          <option value="">Undone</option>
        </select>
      </div>
      <button className='searchBtn generalBtn' onClick={(e)=>{e.preventDefault()}}>Search</button>
    </form>
  );
}

function NewToDoBtn(){
  return(
    <button className='newToDoBtn generalBtn'>+ New To Do</button>
  );
}

function ToDosTable({ todosArr }){

  
  const rows = [];
  todosArr.forEach((todo)=>{
    rows.push(
      <ToDoRow 
      key = {todo.id}
      toDo = {todo}
      />
    )
  });
  console.log(rows);
  /*

        <ToDoRow toDo={todosArr[0]} />
        <ToDoRow toDo={todosArr[1]} />
        <ToDoRow toDo={todosArr[2]} />
        <ToDoRow toDo={todosArr[3]} />

  */


  return(
    <div className='tableContainer'>
    <table>
      <thead>
        <tr>
          <td>State</td>
          <td>Name</td>
          <td>Priority</td>
          <td>Due Date</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </div>
  );
}
function ToDoRow({ toDo }){
  return(
    <tr>          
      <td><input type="checkbox" name="" id="" /></td> 
      <td>{toDo.text}</td>  
      <td>{toDo.priority}</td> 
      <td>{toDo.dueDate}</td> 
      <td>Edit/Delete</td> 
    </tr>
  );
}
function App() {
  const [count, setCount] = useState(0)
  let todosArr = [
    {id: 1, text: "Task 1", dueDate: "-", doneState: true, doneDate: "2022/02/01", priority: "Low", creationDate: "2022/01/15"},
    {id: 2, text: "Task 2", dueDate: "2022/02/02", doneState: false, doneDate: "-", priority: "High", creationDate: "2022/01/18"},
    {id: 3, text: "Task 3", dueDate: "2023/02/02", doneState: false, doneDate: "-", priority: "Medium", creationDate: "2022/01/04"},
    {id: 4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et efficitur risus. Nulla varius vehicula massa, sus.", dueDate: "2024/08/12", doneState: false, doneDate: "-", priority: "High", creationDate: "2024/07/29"},
    {id: 5, text: "Task 1", dueDate: "-", doneState: true, doneDate: "2022/02/01", priority: "Low", creationDate: "2022/01/15"},
    {id: 6, text: "Task 2", dueDate: "2022/02/02", doneState: false, doneDate: "-", priority: "High", creationDate: "2022/01/18"},
    {id: 7, text: "Task 3", dueDate: "2023/02/02", doneState: false, doneDate: "-", priority: "Medium", creationDate: "2022/01/04"},
  ]

  return (
    <>
      <SearchBar />
      <NewToDoBtn />
      <ToDosTable todosArr={todosArr} />
    </>
  )
}

export default App