import { useState } from "react";
import "./App.css";
import { SearchBar } from "./features/components/SearchBar";
import { ToDosTable } from "./features/components/ToDosTable";
import { NewToDoBtn } from "./features/components/NewToDoBtn";
import { NewTodoModal } from "./features/components/NewTodoModal";
import { PaginationControl } from "./features/components/PaginationControl";
import { Metrics } from "./features/components/Metrics";
import { EmptyData } from "./features/components/EmptyData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateData, updateMetrics } from "./features/todos/todos";
import { updatePagination } from "./features/pagination/paginationSlice";
import { useTodo } from "./features/hooks/useTodo.JS";
import { devModeGenerator } from "./features/devModeGenerator/devModeGenerator";

function App() {
  const [modalState, setModalState] = useState(false);

  const todosArr = useSelector((state) => state.todos.data);
  const filters = useSelector((state) => state.todos.filters);
  const sort = useSelector((state) => state.todos.sort);
  const page = useSelector((state) => state.pagination.requestPage.page);
  const dispatch = useDispatch();
  const devModeConst = import.meta.env.DEV;
  const apiUrl = import.meta.env.VITE_API_URL;

  const {
    onGetFilteredData,
    onAddTodo,
    onDeleteTodo,
    onUpdateTodo,
    onUnmarkTodo,
    onMarkTodo,
  } = useTodo();

  function toggleModal() {
    setModalState(!modalState);
  }

  function getNewData() {
    let requestString = `page=${page}&priority=${filters.priority}&state=${filters.state}&text=${filters.text}`;
    if (sort.sortByPrioirty != null) {
      requestString += `&sortByPriority=${sort.sortByPrioirty}`;
    }

    if (sort.sortByDate != null) {
      requestString += `&sortByDate=${sort.sortByDate}`;
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    fetch(apiUrl + `/api/todos?${requestString}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updateData(data.data));
        dispatch(updateMetrics(data.metrics));
        dispatch(updatePagination(data.pagination));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Failed to fetch new data.\nPlease try again later.");
      });
  }

  return (
    <>
      <div className="topContainer">
        <SearchBar onGetFilteredData={onGetFilteredData} />
        <NewToDoBtn toggleModal={toggleModal} />
        {todosArr.length > 0 ? (
          <ToDosTable
            onGetFilteredData={onGetFilteredData}
            todosArr={todosArr}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
            onMarkTodo={onMarkTodo}
            onUnmarkTodo={onUnmarkTodo}
          />
        ) : (
          <EmptyData />
        )}
      </div>
      <div className="bottomContainer">
        <PaginationControl onGetFilteredData={onGetFilteredData} />
        <Metrics />
        {modalState ? (
          <NewTodoModal
            getNewData={getNewData}
            onAddTodo={onAddTodo}
            toggleModal={toggleModal}
          />
        ) : null}
        {devModeConst ? (
          <button onClick={devModeGenerator} id="devModeBtn">
            Generate Todos
          </button>
        ) : null}
      </div>
    </>
  );
}

export default App;
