# Todo App project

The main objective of this project is to develop a functional full stack To Do app, using React for the front end, and Spring Boot for the back end.

## Setting up the projects
Once you've made a local copy of this repository, you must use run the following commands on each particular directory.
### Front end
To install dependencies:
```
npm install
```
To run the project:
```
npm run start
```
To run the tests:
```
npm run test
```

### Back end
To run the project:
```
mvn spring-boot:run
```
To run the tests:
```
mvn test
```
# GenAI:
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

Note: If both sortByPriority and sortByDate query parameters are set, the  Todos will appear sorted first by date and then by priority.

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
- `Todo` object.  

Response:
- `200 OK`: Returns the saved todo or an error message if validation fails.
- `Todo` object.

### Update Todo
URL: `/api/todos/{id}`  
Method: `PUT`  
Description: Updates an existing todo.  

Path Variable:
- `id` (int): The ID of the todo to update.
Request Body:
- `Todo` object.
Response:
- `200 OK`: Returns the updated todo.
- `Todo` object.

### Mark Todo as Done   
URL: `/api/todos/{id}/done`   
Method: `POST`   
Description: Marks a todo as done.   

Path Variable:
- `id` (int): The ID of the todo to mark as done.

Response:
- `200 OK`: Returns the updated todo.
- `Todo` object.

### Mark Todo as Undone
URL: `/api/todos/{id}/undone`   
Method: `PUT`   
Description: Marks a todo as undone.   

Path Variable:
- `id` (int): The ID of the todo to mark as undone.

Response:
- `200 OK`: Returns the updated todo.
- `Todo` object.

### Delete Todo
URL: `/api/todos/{id}`   
Method: `DELETE`  
Description: Deletes a todo.    

Path Variable:
- `id` (int): The ID of the todo to delete.

Response:
- `200 OK`: Returns the deleted todo.
- `Todo` object.
