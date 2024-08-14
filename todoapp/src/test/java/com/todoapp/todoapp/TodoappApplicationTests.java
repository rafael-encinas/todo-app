package com.todoapp.todoapp;

import static org.assertj.core.api.Assertions.assertThat;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.todoapp.todoapp.TodoappApplication.Todo;
import com.todoapp.todoapp.TodoappApplication.TodoResource;
import com.todoapp.todoapp.TodoappApplication.TodosInMemoryRepository;
import java.util.ArrayList;




@SpringBootTest
class TodoappApplicationTests {

	@Autowired
	private TodoResource TodoController;

	@Test 
	void contextLoads() throws Exception{
		assertThat(TodoController).isNotNull();
	}

	@Autowired
	private TodosInMemoryRepository TodoRepository;


	@Test
	public void createTodo() throws Exception{
		Todo mockTodo1 = new Todo();
		mockTodo1.setText("This is a mock todo!");
		mockTodo1.setDueDate(null);
		mockTodo1.setDoneState(false);
		mockTodo1.setPriority(0);

		//If successfuly saved, a todo will be returned and stored as 'savedTodo'
		Todo savedTodo = TodoRepository.saveTodo(mockTodo1);

		Assertions.assertThat(savedTodo).isNotNull();
	}

	@Test
	public void createTodoAndGetItBack() throws Exception{
		Todo mockTodo1 = new Todo();
		mockTodo1.setText("This is a mock todo!");
		mockTodo1.setDueDate(null);
		mockTodo1.setDoneState(false);
		mockTodo1.setPriority(0);

		//If successfuly saved, a todo will be returned and stored as 'savedTodo'
		Todo savedTodo = TodoRepository.saveTodo(mockTodo1);

		Assertions.assertThat(savedTodo).isNotNull();

		ArrayList<Todo> reponseArray = TodoRepository.findAll();
		Assertions.assertThat(reponseArray).isNotNull();
		Assertions.assertThat(reponseArray.get(0).getId()).isEqualTo(1);
	}

	@Test
	public void createTodoAndUpdateIt() throws Exception{
		Todo mockTodo1 = new Todo();
		mockTodo1.setText("This is a mock todo!");
		mockTodo1.setDueDate(null);
		mockTodo1.setDoneState(false);
		mockTodo1.setPriority(0);

		
		Todo updatedMockTodo1 = new Todo();
		updatedMockTodo1.setText("This is text was updated!");
		updatedMockTodo1.setDueDate(null);
		updatedMockTodo1.setDoneState(false);
		updatedMockTodo1.setPriority(0);

		//If successfuly saved, a todo will be returned and stored as 'savedTodo'
		Todo savedTodo = TodoRepository.saveTodo(mockTodo1);

		Assertions.assertThat(savedTodo).isNotNull();

		//Try to update the todo we've just created at id:1
		Todo updatedTodo = TodoRepository.updateTodo(1, updatedMockTodo1);
		Assertions.assertThat(updatedTodo.getText()).isEqualTo("This is text was updated!");

	}

	public void createTodoAndSetItAsDone() throws Exception{
		Todo mockTodo1 = new Todo();
		mockTodo1.setText("This is a mock todo!");
		mockTodo1.setDueDate(null);
		mockTodo1.setDoneState(false);
		mockTodo1.setPriority(0);


		//If successfuly saved, a todo will be returned and stored as 'savedTodo'
		Todo savedTodo = TodoRepository.saveTodo(mockTodo1);

		Assertions.assertThat(savedTodo).isNotNull();
		//As this todo is not marked as done, done date should be null
		Assertions.assertThat(savedTodo.getDoneDate()).isNull();

		//Try to update the todo we've just created at id:1
		Todo updatedTodo = TodoRepository.markDone(1);
		Assertions.assertThat(updatedTodo.isDoneState());
		//By setting this todo as done, doneDate should not be null
		Assertions.assertThat(updatedTodo.getDoneDate()).isNotNull();

	}

	public void createTodoAndSetItAsDoneAndThenUndone() throws Exception{
		Todo mockTodo1 = new Todo();
		mockTodo1.setText("This is a mock todo!");
		mockTodo1.setDueDate(null);
		mockTodo1.setDoneState(false);
		mockTodo1.setPriority(0);


		//If successfuly saved, a todo will be returned and stored as 'savedTodo'
		Todo savedTodo = TodoRepository.saveTodo(mockTodo1);

		Assertions.assertThat(savedTodo).isNotNull();
		//As this todo is not marked as done, done date should be null
		Assertions.assertThat(savedTodo.getDoneDate()).isNull();

		//Try to update the todo we've just created at id:1
		Todo updatedTodo = TodoRepository.markDone(1);
		Assertions.assertThat(updatedTodo.isDoneState());
		//By setting this todo as done, doneDate should not be null
		Assertions.assertThat(updatedTodo.getDoneDate()).isNotNull();

		//Try to un mark the todo we've just created at id:1
		Todo unDoneTodo = TodoRepository.markUndone(1);
		Assertions.assertThat(unDoneTodo.isDoneState()).isFalse();
		//By setting this todo as undone, doneDate should now be null
		Assertions.assertThat(unDoneTodo.getDoneDate()).isNull();

	}


}
