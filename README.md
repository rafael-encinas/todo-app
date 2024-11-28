# Todo App project
## Requirements
To be able to run the project, the following software must be installed:
-  Node v16
- npm v28
## Running in Development Mode
To run the full stack To Do app in development mode, follow these steps:

1. Start the front end:
    - Open a terminal and navigate to the front end directory.
    - Run the following command to install the dependencies:
      ```
      npm install
      ```
    - Run the following command to start the front end:
      ```
      npm run start
      ```

2. Start the back end:
    - Open another terminal and navigate to the back end directory.
    - Run the following command to start the back end:
      ```
      mvn spring-boot:run
      ```

3. Access the app:
    - Open a web browser and go to `http://localhost:8080` to access the To Do app.

## Running in Production Mode
To run the full stack To Do app in production mode, follow these steps:

1. Build the front end:
    - Open a terminal and navigate to the front end directory.
    - Run the following command to install the dependencies:
      ```
      npm install
      ```
    - Run the following command to build the front end:
      ```
      npm run build
      ```
    - Navigate to the `dist` directory.
    - Open the `index.html` file in a web browser to view the built front end.

2. Start the back end:
    - Open another terminal and navigate to the back end directory.
    - Run the following command to start the back end:
      ```
      mvn spring-boot:run
      ```

3. Making requests to the API:
    - API requests must be sent to `http://localhost:9090`

## API endpoints

### Get Paginated Todos
URL: `/api/todos`  
Method: `GET`  
Description: Retrieves paginated todos based on the provided parameters.  

Parameters:
- `page` (query parameter): Specifies the page number for pagination.
- `sortByPriority` (query parameter): Sorts the todos by priority. Use "low" for low priority and "high" for high priority.
- `sortByDate` (query parameter): Sorts the todos by date. Use "sooner" for earlier dates and "later" for later dates.
- `priority` (query parameter): Filters the todos by priority. Use "0" for low priority, "1" for medium priority, "2" for high priority, and "3" for all priorities.
- `state` (query parameter): Filters the todos by state. Use "0" for undone todos, "`done`" for done todos, and "2" for all todos.
- `text` (query parameter): Filters the todos by text content.

Response:
- `200 OK`: Returns a paginated list of todos.
- Response object.

Note: If both sortByPriority and sortByDate query parameters are set, Todos will appear sorted first by date and then by priority.

### Get All Todos
URL: `/api/todos/getall`  
Method: `GET`  
Description: Retrieves all todos.  

Parameters:
- `allParams` (query parameters): A map of query parameters.

Response:
- `200 OK`: Returns a list of all todos.
- `204 No Content`: If no todos are found.
- `ArrayList<Todo>` object.

### Save Todo
URL: `/api/todos`   
Method: `POST`   
Description: Saves a new todo.  

Request Body:
- `Todo` object:
  ```json
  {
    "text": string,       //Between 1 and 120 characters
    "dueDate": string,    //Date in format "YYYY-MM-DD", or null
    "doneState": boolean, //Initially must be sent as false
    "priority": integer,  //low-> 0, medium -> 1, high -> 2
  } 
- Todo body example:
  ```json
  {
    "text": "Low priority todo, don't worry too much",
    "dueDate": "2005-05-01",
    "doneState": false,
    "priority": 1,
  }
Response:
- `200 OK`: Returns the saved todo.
  ```json
    {
      "id": 1,
      "text": "Low priority todo, don't worry too much",
      "dueDate": "2005-05-01",
      "doneState": false,
      "doneDate": null,
      "creationDate": "2024-11-27 10:39:17",
      "priority": 1,
    }
-  `400 Bad Request`: Returns an error with a Custom-Error-Code header:
    - Headers:
      - `Custom-Error-Code`: `WRONG_TEXT_LENGTH` | `WRONG_PRIORITY`
### Update Todo
URL: `/api/todos/{id}`  
Method: `PUT`  
Description: Updates an existing todo.  

Path Variable:
- `id` (int): The ID of the todo to update.

Request Body:
- `Todo` object example:
  ```json
  {
    "text": "Updated the text and priority",
    "dueDate": "2005-05-01",
    "doneState": false,
    "priority": 2,
  }
Response:
- `200 OK`: Returns the updated todo.
- `Todo` object.
  ```json
      {
        "id": 1,
        "text": "Updated the text and priority",
        "dueDate": "2005-05-01",
        "doneState": false,
        "doneDate": null,
        "creationDate": "2024-11-27 10:39:17",
        "priority": 2,
      }
-  `400 Bad Request`: Returns an error with a Custom-Error-Code header:
    - Headers:
      - `Custom-Error-Code`: `WRONG_TEXT_LENGTH` | `WRONG_PRIORITY`      
-  `404 Not Found`: Returns an error with a Custom-Error-Code header:
    - Headers:
      - `Custom-Error-Code`: `TODO_NOT_UPDATED`         

### Mark Todo as Done   
URL: `/api/todos/{id}/done`   
Method: `POST`   
Description: Marks a todo as done.   

Path Variable:
- `id` (int): The ID of the todo to mark as done.

Response:
- `200 OK`: Returns the updated todo.
- `Todo` object:
  ```json
      {
        "id": 1,
        "text": "Updated the text and priority",
        "dueDate": "2005-05-01",
        "doneState": true,
        "doneDate": "2024-11-27 11:00:19",
        "creationDate": "2024-11-27 10:39:17",
        "priority": 2,
      }
-  `404 Not Found`: Returns an error with a Custom-Error-Code header:
    - Headers:
      - `Custom-Error-Code`: `TODO_NOT_FOUND_DONE`  
### Mark Todo as Undone
URL: `/api/todos/{id}/undone`   
Method: `PUT`   
Description: Marks a todo as undone.   

Path Variable:
- `id` (int): The ID of the todo to mark as undone.

Response:
- `200 OK`: Returns the updated todo.
- `Todo` object:
  ```json
      {
        "id": 1,
        "text": "Updated the text and priority",
        "dueDate": "2005-05-01",
        "doneState": false,
        "doneDate": null,
        "creationDate": "2024-11-27 10:39:17",
        "priority": 2,
      }
-  `404 Not Found`: Returns an error with a Custom-Error-Code header:
    - Headers:
      - `Custom-Error-Code`: `TODO_NOT_FOUND_UNDONE`  
### Delete Todo
URL: `/api/todos/{id}`   
Method: `DELETE`  
Description: Deletes a todo.    

Path Variable:
- `id` (int): The ID of the todo to delete.

Response:
- `200 OK`: Returns the deleted todo.
- `Todo` object:
  ```json
      {
        "id": 1,
        "text": "Updated the text and priority",
        "dueDate": "2005-05-01",
        "doneState": false,
        "doneDate": null,
        "creationDate": "2024-11-27 10:39:17",
        "priority": 2,
      }
-  `404 Not Found`: Returns an error with a Custom-Error-Code header:
    - Headers:
      - `Custom-Error-Code`: `DELETE_ERROR`  
### Error Codes
- `WRONG_TEXT_LENGTH`: The text length is not within the allowed range (1-120 characters).
- `WRONG_PRIORITY`: The priority is not within the allowed range (0-2).
- `TODO_NOT_UPDATED`: The requested todo item was not found and couldn't be updated.
- `TODO_NOT_FOUND_DONE`: The requested todo item was not found and couldn't be marked as done.
- `TODO_NOT_FOUND_UNDONE`: The requested todo item was not found and couldn't be marked as undone.
- `DELETE_ERROR`: The requested todo item was not found and couldn't be deleted.