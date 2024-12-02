package com.todoapp.todoapp;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todoapp.todoapp.models.Response;
import com.todoapp.todoapp.models.Todo;
import com.todoapp.todoapp.repository.TodosInMemoryRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
//@CrossOrigin
@RequestMapping("/api/todos")
public class TodoappController {
    
		private TodosInMemoryRepository repository = new TodosInMemoryRepository();

		void TodoResource(TodosInMemoryRepository repository){
			this.repository = repository;
		}

		//@CrossOrigin(origins = allowedOrigins)
		@GetMapping
		public ResponseEntity<Response> findPagination(@RequestParam Map<String,String> allParams){
			Response response = repository.findPagination(allParams);
            return ResponseEntity.ok(response);
		}

		@GetMapping(value = "/getall")
		public ResponseEntity<ArrayList<Todo>> findAll(@RequestParam Map<String,String> allParams){
			ArrayList<Todo> todos = repository.findAll();
			if (todos.isEmpty()){
				System.out.println("todos is empty!");
                return ResponseEntity.noContent().build();
			}
            return ResponseEntity.ok(todos);
		}
		

		@PostMapping
		public ResponseEntity<Todo> saveTodo(@RequestBody Todo todo){
			int maxTextLength = 120;
			int minTextLength = 1;
			Todo todoPostError = new Todo();

			boolean textLengthCheck = false;
			if(todo.getText().length() <= maxTextLength && todo.getText().length() >= minTextLength) {
				textLengthCheck = true;
			} else{
				todoPostError.setText("Error: Text must have between 1 and 120 characters. Try again");
				todoPostError.setId(-1);
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.header("Custom-Error-Code", "WRONG_TEXT_LENGTH")
				.build();
			}
			
			boolean prioritySetCheck = false;
			if(todo.getPriority() <= 2 && todo.getPriority() >= 0) {
				prioritySetCheck = true;
			} else{
				todoPostError.setText("Error: Priority must between 0 and 2. Try again");
				todoPostError.setId(-1);
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.header("Custom-Error-Code", "WRONG_PRIORITY")
				.build();
			}
			Todo responseTodo = repository.saveTodo(todo);
			if(responseTodo  == null){
				return ResponseEntity.badRequest().body(responseTodo);
			} else{
				return ResponseEntity.ok(responseTodo);
			}
		}

		@PutMapping("/{id}")
		public ResponseEntity<Todo> updateTodo(@PathVariable int id, @RequestBody Todo todo) {
			int maxTextLength = 120;
			int minTextLength = 1;
			Todo todoPostError = new Todo();
			boolean textLengthCheck = false;
			if(todo.getText().length() <= maxTextLength && todo.getText().length() >= minTextLength) {
				textLengthCheck = true;
			} else{
				todoPostError.setText("Error: Text must have between 1 and 120 characters. Try again");
				todoPostError.setId(-1);
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.header("Custom-Error-Code", "WRONG_TEXT_LENGTH")
				.build();
			}
			boolean prioritySetCheck = false;
			if(todo.getPriority() <= 2 && todo.getPriority() >= 0) {
				prioritySetCheck = true;
			} else{
				todoPostError.setText("Error: Priority must between 0 and 2. Try again");
				todoPostError.setId(-1);
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.header("Custom-Error-Code", "WRONG_PRIORITY")
				.build();
			}
			Todo responseTodo = repository.updateTodo(id, todo);
			if(responseTodo.getId() == -1){
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.header("Custom-Error-Code", "TODO_NOT_UPDATED")
				.build();
			} else{
				return ResponseEntity.ok(responseTodo);
			}
		}

		//Post /todos/{id}/done to mark "todo" as done

		@PostMapping("/{id}/done")
		public ResponseEntity<Todo> markDone(@PathVariable int id) {
			Todo responseTodo = repository.markDone(id);
			if(responseTodo.getId() == -1){
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.header("Custom-Error-Code", "TODO_NOT_FOUND_DONE")
				.build();
			} else{
				return ResponseEntity.ok(responseTodo);
			}
		}
		
		//Put /todos/{id}/undone to mark "todo" as undone

		@PutMapping("/{id}/undone")
		public ResponseEntity<Todo> markUndone(@PathVariable int id) {
			Todo responseTodo = repository.markUndone(id);
			if(responseTodo.getId() == -1){
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.header("Custom-Error-Code", "TODO_NOT_FOUND_UNDONE")
				.build();
			} else{
				return ResponseEntity.ok(responseTodo);
			}
		}

		@DeleteMapping(value = "/{id}")
		public ResponseEntity<Todo> deleteTodo(@PathVariable("id") int id){
			Todo responseTodo = repository.deleteTodo(id);
			if(responseTodo.getId() == -1){
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Custom-Error-Code", "DELETE_ERROR")
                    .build();
			} else{
				return ResponseEntity.ok(responseTodo);
			}
		}
    
}
