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
import { UpdateToDoModal } from './features/components/UpdateToDoModal';
import { PaginationControl } from './features/components/PaginationControl';
import { Metrics } from './features/components/Metrics';
import { EmptyData } from './features/components/EmptyData';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateData, updateMetrics } from './features/todos/todos';
import { updatePagination } from './features/pagination/paginationSlice';
import { useTodo } from './features/hooks/useTodo.JS';

function App() {
  const [modalState, setModalState] = useState(false);

  //variable de entorno para identificar el modo, si es desarrollo o produccion
  const todosArr = useSelector((state)=> state.todos.data);
  const filters = useSelector((state)=> state.todos.filters);
  const sort = useSelector((state)=> state.todos.sort);
  const page = useSelector((state)=> state.pagination.requestPage.page);
  const dispatch = useDispatch();
  const devModeConst = import.meta.env.DEV;

  const { onGetFilteredData, onAddTodo, onDeleteTodo, onUpdateTodo, onUnmarkTodo, onMarkTodo, onGenerateTodos } = useTodo();


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
      <SearchBar onGetFilteredData={onGetFilteredData} />
      <NewToDoBtn   toggleModal={toggleModal}  />
      {
        todosArr.length>0?
        <ToDosTable onGetFilteredData={onGetFilteredData}  todosArr={todosArr} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} onMarkTodo={onMarkTodo} onUnmarkTodo={onUnmarkTodo} />
        :
        <EmptyData />
      }
      <PaginationControl onGetFilteredData={onGetFilteredData}  />
      <Metrics />
      {modalState? <NewTodoModal getNewData={getNewData} onAddTodo={onAddTodo} toggleModal={toggleModal}/> :null}
      {devModeConst? <button onClick={onGenerateTodos}>Generate Todos</button>:null}
    </>
  )
}

export default App
