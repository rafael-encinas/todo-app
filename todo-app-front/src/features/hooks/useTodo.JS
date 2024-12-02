import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData, updateMetrics } from "../todos/todos";
import { updatePagination } from "../pagination/paginationSlice";

export function useTodo(){
    const filters = useSelector((state)=> state.todos.filters);
    const sort = useSelector((state)=> state.todos.sort);
    const page = useSelector((state)=> state.pagination.requestPage.page);
    const apiUrl = import.meta.env.VITE_API_URL;

    
    const dictionary = {
      errors:{
        DELETE_ERROR: "Failed to delete the todo. Please try again later.",
        TODO_NOT_FOUND_UNDONE: "Failed to unmark the todo. Please try again later.",
        TODO_NOT_FOUND_DONE: "Failed to mark the todo as done. Please try again later.",
        TODO_NOT_UPDATED: "Failed to update the todo. Please try again later.",
        WRONG_PRIORITY: "Priority must be a number between 0 and 2.",
        WRONG_TEXT_LENGTH: "Text must be between 1 and 120 characters long."
      }
    }


    let customErrorCode = null;

    const dispatch = useDispatch();

    //Only runs one time for initial rendering, gets all todos with no filters
    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
          } 
        fetch(apiUrl + `/api/todos`, requestOptions)
        .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
            dispatch(updateData(data.data));
            dispatch(updateMetrics(data.metrics));
            dispatch(updatePagination(data.pagination));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to fetch the data. \nPlease make sure the backend server is running.');
        });
    }, [0]);

    const onGetFilteredData = (filters, sort, requestPage)=>{
        //Filters, sort, and page should come from invocation
        if(requestPage === undefined){
          requestPage = 1;
        }
        let requestString = `page=${requestPage}&priority=${filters.priority}&state=${filters.state}&text=${filters.text}`;
        if(sort.sortByPriority != null){
        requestString += `&sortByPriority=${sort.sortByPriority}`;
        }
        if(sort.sortByDate != null){
        requestString += `&sortByDate=${sort.sortByDate}`;
        }
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
          }
        fetch(apiUrl + `/api/todos?${requestString}`, requestOptions)
        .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if(data.data.length === 0 && requestPage > 1){
            console.log("No data found, fetching previous page");
            data.pagination.current_page = requestPage-1;
            dispatch(updatePagination(data.pagination));
            onGetFilteredData(filters, sort, requestPage-1);
          } else{
            dispatch(updateData(data.data));
            dispatch(updateMetrics(data.metrics));
            dispatch(updatePagination(data.pagination));
          }
            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to fetch the data. \nPlease make sure the backend server is running.');
        });
    }

    //Post todo to API
    const onAddTodo = ((text, dueDate, priority) =>{
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({text: text, dueDate: dueDate, doneState: false, priority: priority})
          };
          fetch(apiUrl + '/api/todos', requestOptions)
            .then(response => {
              if (!response.ok) {
                customErrorCode = response.headers.get('Custom-Error-Code');
                throw new Error(`Network response was not ok. Custom error code: ${customErrorCode}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Success:', data);
            })
            .catch(error => {
              displayError(error, customErrorCode);
            })
            .finally(() => {
              callOnGetFilteredDataAfterTimeout();
            });
    });

    const onUpdateTodo = ((text, dueDate, priority, id) =>{
      const requestOptions = {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify({text: text, dueDate: dueDate, priority: priority})
        };
        fetch(apiUrl + `/api/todos/${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
              customErrorCode = response.headers.get('Custom-Error-Code');
              throw new Error(`Network response was not ok. Custom error code: ${customErrorCode}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Success:', data);
          })
          .catch(error => {
            displayError(error, customErrorCode);
          })
          .finally(() => {
            callOnGetFilteredDataAfterTimeout();
          });
    });

    const onMarkTodo = ((id) =>{
      const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify({})
        };
        fetch(apiUrl+ `/api/todos/${id}/done`, requestOptions)
        .then(response => {
          if (!response.ok) {
            customErrorCode = response.headers.get('Custom-Error-Code');
            throw new Error(`Network response was not ok. Custom error code: ${customErrorCode}`);
          }
          return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
          displayError(error, customErrorCode);
        })
        .finally(() => {
          callOnGetFilteredDataAfterTimeout();
        });
    });

    const onUnmarkTodo = ((id) =>{
      const requestOptions = {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify({})
        };
        fetch(apiUrl + `/api/todos/${id}/undone`, requestOptions)
        .then(response => {
          if (!response.ok) {
            customErrorCode = response.headers.get('Custom-Error-Code');
            throw new Error(`Network response was not ok. Custom error code: ${customErrorCode}`);
          }
          return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
          displayError(error, customErrorCode);
        })
        .finally(() => {
          callOnGetFilteredDataAfterTimeout();
        });
    });

    const onDeleteTodo = ((id)=>{
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
          };
          fetch(apiUrl + `/api/todos/${id}`, requestOptions)
          .then(response => {
            if (!response.ok) {
              customErrorCode = response.headers.get('Custom-Error-Code');
              throw new Error(`Network response was not ok. Custom error code: ${customErrorCode}`);
            }
            return response.json();
          })
          .then(data => {
              console.log('Success:', data);
              //checar bandera de error y mandar alert
          })
          .catch(error => {
            displayError(error, customErrorCode);
              //console.error('There was a problem with the fetch operation:', error);
              //alert(dictionary.errors.DELETE_ERROR);
          })
          .finally(() => {
            callOnGetFilteredDataAfterTimeout();
          });
    });

    function displayError(error, customErrorCode){
       console.log("There was a problem with the fetch operation:", error);
       alert(dictionary.errors[customErrorCode]);
    }

    function callOnGetFilteredDataAfterTimeout(){
      setTimeout(
        () => onGetFilteredData(filters, sort, page), 
        100
      );
    }

    return { onGetFilteredData, onAddTodo, onDeleteTodo, onUpdateTodo, onUnmarkTodo, onMarkTodo }
}