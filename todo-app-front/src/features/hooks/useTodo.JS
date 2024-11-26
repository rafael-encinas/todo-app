import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData, updateMetrics } from "../todos/todos";
import { updatePagination } from "../pagination/paginationSlice";

export function useTodo(){
    const filters = useSelector((state)=> state.todos.filters);
    const sort = useSelector((state)=> state.todos.sort);
    const page = useSelector((state)=> state.pagination.requestPage.page);
    const apiUrl = import.meta.env.VITE_API_URL;

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
            alert('Failed to fetch the filtered data. \nPlease make sure the backend server is running.');
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
            dispatch(updateData(data.data));
            dispatch(updateMetrics(data.metrics));
            dispatch(updatePagination(data.pagination));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to fetch the filtered data. \nPlease make sure the backend server is running.');
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
                  throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
                if (data.id <= -1) {
                    alert(data.text);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Failed to add the todo. \nPlease make sure the backend server is running.');
            })
            .finally(() => {
                setTimeout(
                    () => onGetFilteredData(filters, sort, page), 
                    100
                );
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
                throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
              if (data.id <= -1) {
                  alert(data.text);
              }
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
              alert('Failed to update the todo. Please try again later.');
          })
          .finally(() => {
              setTimeout(
                  () => onGetFilteredData(filters, sort, page), 
                  100
              );
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
              throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to mark the todo as done. Please try again later.');
        })
        .finally(() => {
            setTimeout(
                () => onGetFilteredData(filters, sort, page), 
                100
            );
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
              throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to unmark the todo. Please try again later.');
        })
        .finally(() => {
            setTimeout(
                () => onGetFilteredData(filters, sort, page), 
                100
            );
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
                throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
              console.log('Success:', data);
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
              alert('Failed to delete the todo. Please try again later.');
          })
          .finally(() => {
              setTimeout(
                  () => onGetFilteredData(filters, sort, page), 
                  100
              );
          });
    });

    return { onGetFilteredData, onAddTodo, onDeleteTodo, onUpdateTodo, onUnmarkTodo, onMarkTodo }
}