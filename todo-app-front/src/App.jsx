import { useState } from 'react'
//import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Counter } from './features/counter/Counter';
import { SearchText } from './features/searchText/SearcText';
import { SearchBar } from './features/components/SearchBar';
import { ToDosTable } from './features/components/ToDosTable';
import { NewToDoBtn } from './features/components/NewToDoBtn';
import { NewTodoModal } from './features/components/NewTodoModal';
import { PaginationControl } from './features/components/PaginationControl';
import { Metrics } from './features/components/Metrics';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateData, updateMetrics } from './features/todos/todos';
import { updatePagination } from './features/pagination/paginationSlice';
import { useTodo } from './features/hooks/useTodo.JS';

function App() {
  const [modalState, setModalState] = useState(false);
  const todosArr = useSelector((state)=> state.todos.data);
  const filters = useSelector((state)=> state.todos.filters);
  const sort = useSelector((state)=> state.todos.sort);
  const page = useSelector((state)=> state.pagination.requestPage.page);
  const dispatch = useDispatch();


  function toggleModal(){
    setModalState(!modalState);
  }

  function getNewData(){
    console.log("Time to get data!");
    //Create get request

    console.log("Sort: ");
    console.log(sort);

    let requestString = `page=${page}&priority=${filters.priority}&state=${filters.state}&text=${filters.text}`;
    if(sort.sortByPrioirty != null){
      requestString += `&sortByPriority=${sort.sortByPrioirty}`;
    }

    if(sort.sortByDate != null){
      requestString += `&sortByDate=${sort.sortByDate}`;
    }
    
    console.log("requestString: " + requestString);
    
    //console.log("sortByPriority: " + sort.sortByPrioirty);
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    }
    
    fetch(`http://localhost:9090/api/todos?${requestString}`, requestOptions)
      .then(response=>response.json())
      .then(data=> {
        console.log(data);
        dispatch(updateData(data.data));
        dispatch(updateMetrics(data.metrics));
        dispatch(updatePagination(data.pagination));
      })
  }

  return (
    <>
      <SearchBar getNewData={getNewData} />
      <NewToDoBtn   toggleModal={toggleModal}  />
      <ToDosTable getNewData={getNewData}  todosArr={todosArr} />
      <PaginationControl getNewData={getNewData}  />
      <SearchText />
      <Metrics />
      {modalState? <NewTodoModal getNewData={getNewData} toggleModal={toggleModal}/> :null}
    </>
  )
}

export default App


/*
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

function NewToDoBtn({ toggleModal }){
  return(
    <button className='newToDoBtn generalBtn' onClick={toggleModal}>+ New To Do</button>
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

function ToDoRow({ toDo }){
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

function PaginationControl(){
  let pages= [1,2,3,4,5,6,7,8,9,10];
  let pagesBtns = [];
  pages.forEach((page, index)=>{
    pagesBtns.push(
      <PageButton pageNum={page} key={index} />
    )
  });

  return(
    <div className='paginationControl'>
      <button>Left</button>
      {pagesBtns}
      <button>Right</button>
    </div>
  )
}

function PageButton({ pageNum }){
  return(
    <button>{pageNum}</button>
  );
}

function Metrics({ metrics }){
  const searchText = useSelector((state)=> state.searchText.testing)
  return(
    <div className='metricsContainer'>
      <div>
        <div>Average time to finish tasks:</div>
        <div>22:15 minutes</div>
      </div>
      <div>
        <div>Average time to finish tasks by priority:</div>
        <div>Low: <span>{searchText}</span></div>
        <div>Medium: <span>10:25 minutes</span></div>
        <div>High: <span>10:25 minutes</span></div>
      </div>
    </div>
  )
}

function NewTodoModal({ toggleModal }){
  return(
    <div className='newToDoModal'>
      <div>New "To Do"</div>
      <div className='inputContainer'>
        <label htmlFor="">Text:</label>
        <textarea name="" id="" required rows={3}></textarea>
      </div>
      <div className='inputContainer'>
      <label >Priority: </label>
        <select name="" id="" required>
          <option value="">Low</option>
          <option value="">Medium</option>
          <option value="">High</option>
        </select>
      </div>
      <div className='inputContainer'>
        <label htmlFor="">Due Date:</label>
        <input type="date" name="" id="" />
      </div>
      <div className='btnsContainer'>
        <button className='generalBtn' onClick={toggleModal}>Cancel</button>
        <button type='submit' className='generalBtn saveTodoBtn'>Save</button>
      </div>
    </div>
  );
}
*/
