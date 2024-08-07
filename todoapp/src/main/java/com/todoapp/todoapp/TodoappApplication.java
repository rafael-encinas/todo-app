package com.todoapp.todoapp;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class TodoappApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoappApplication.class, args);
	}

	@RestController
	@RequestMapping("/api/todos")
	static class TodoResource {
		private final TodosInMemoryRepository repository;

		TodoResource(TodosInMemoryRepository repository){
			this.repository = repository;
		}

		@GetMapping
		public ResponseEntity<ArrayList<Todo>> findAll(@RequestParam Map<String,String> allParams){
			ArrayList<Todo> todos = repository.findAll(allParams);
			if (todos.isEmpty()){
				System.out.println("todos is empty!");
                return ResponseEntity.noContent().build();
			}
            return ResponseEntity.ok(todos);
		}

		// Pagination test
		/*
		@GetMapping(value = "/pagination")
		public ResponseEntity<Response> findPagination(@RequestParam Map<String,String> allParams){
			Response response = repository.findPagination(allParams);
            return ResponseEntity.ok(response);
		}
		*/

		@PostMapping
		public ResponseEntity<String> saveTodo(@RequestBody Todo todo){
			// ResponseEntity.ok(repository.saveTodo(todo));
			int maxTextLength = 120;
			int minTextLength = 1;
			boolean textLengthCheck = false;
			if(todo.getText().length() <= maxTextLength && todo.getText().length() >= minTextLength) {
				textLengthCheck = true;
			}
			
			boolean prioritySetCheck = false;
			if(todo.getPriority() <= 2 && todo.getPriority() >= 0) {
				prioritySetCheck = true;
			}

			if(textLengthCheck && prioritySetCheck) return ResponseEntity.ok(repository.saveTodo(todo));

			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("There was a problem with the request, please confirm that 'text' has at least 1 character, and at most 120 characters, and that a priority has been set.");
		}

		@PutMapping("/{id}")
		public ResponseEntity<String> updateTodo(@PathVariable int id, @RequestBody Todo todo) {
			int maxTextLength = 120;
			int minTextLength = 1;
			boolean textLengthCheck = false;
			if(todo.getText().length() <= maxTextLength && todo.getText().length() >= minTextLength) {
				textLengthCheck = true;
			}
			
			boolean prioritySetCheck = false;
			if(todo.getPriority() <= 2 && todo.getPriority() >= 0) {
				prioritySetCheck = true;
			}

			if(textLengthCheck && prioritySetCheck) return ResponseEntity.ok(repository.updateTodo(id, todo));
			
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("There was a problem with the request, please confirm that 'text' has at least 1 character, and at most 120 characters, and that a priority has been set.");
		}

		//Post /todos/{id}/done to mark "todo" as done
		@PostMapping("/{id}/done")
		public ResponseEntity<Todo> markDone(@PathVariable int id) {
			return ResponseEntity.ok(repository.markDone(id));
		}
		
		//Put /todos/{id}/undone
		@PutMapping("/{id}/undone")
		public ResponseEntity<Todo> markUndone(@PathVariable int id) {
			return ResponseEntity.ok(repository.markUndone(id));
		}

		@DeleteMapping(value = "/{id}")
		public ResponseEntity<String> deleteTodo(@PathVariable("id") int id){
			return ResponseEntity.ok(repository.deleteTodo(id));
		}
	}

	@Repository
	static class TodosInMemoryRepository {
		private ArrayList<Todo> todos = new ArrayList<>();
		
		int lastId=0;
		//Predicate<Integer> deleteId = i-> i == 
		private int getIndexFromId(int id){
			int index=-1;

			for(int i = 0; i < todos.size(); i++){
				if(todos.get(i).getId() == id){
					index = i;
					return index;
				}
			}
			return index;
		} 

		ArrayList<Long> lowPriorityTimes = new ArrayList<Long>();
		ArrayList<Long> medPriorityTimes = new ArrayList<Long>();
		ArrayList<Long> highPriorityTimes = new ArrayList<Long>();

		long lowAverage=0;
		long medAverage=0;
		long highAverage=0;
		long overallAverage=0;

		private long getArrayAverageTime(ArrayList<Long> timesArray){
			long cumulativeTime= 0;
			for(int j=0; j<timesArray.size(); j++){
				cumulativeTime += timesArray.get(j);
			}
			long average = cumulativeTime/timesArray.size();
			return average;
		}

		private void updateTimesArrays(){
			lowPriorityTimes.clear();
			medPriorityTimes.clear();
			highPriorityTimes.clear();
			overallAverage=0;
			for(int j=0; j<todos.size(); j++){
				if(todos.get(j).isDoneState()){
					if(todos.get(j).getPriority()==0){
						lowPriorityTimes.add(timeDiffString(todos.get(j).getCreationDate(), todos.get(j).getDoneDate()));	//Get time difference in seconds and store it
					} else if(todos.get(j).getPriority()==1){
						medPriorityTimes.add(timeDiffString(todos.get(j).getCreationDate(), todos.get(j).getDoneDate()));	//Get time difference in seconds and store it
					} else{
						highPriorityTimes.add(timeDiffString(todos.get(j).getCreationDate(), todos.get(j).getDoneDate()));	//Get time difference in seconds and store it
					}
				}
			}
			updateTimesAverages();
		}

		private void updateTimesAverages(){
			int howManyCalculations = 0;
			long tempSum=0;
			// Check if arrays aren't empty first!
			if(lowPriorityTimes.size()>0){
				lowAverage = getArrayAverageTime(lowPriorityTimes);
				tempSum += lowAverage;
				howManyCalculations += 1; 
			} else{ lowAverage = 0; }
			if(medPriorityTimes.size()>0){
				medAverage = getArrayAverageTime(medPriorityTimes);
				tempSum += medAverage;
				howManyCalculations += 1; 
			} else{ medAverage = 0; }
			if(highPriorityTimes.size()>0){
				highAverage = getArrayAverageTime(highPriorityTimes);
				tempSum += highAverage;
				howManyCalculations += 1; 
			} else{ highAverage = 0; }
			if(howManyCalculations>0){
				overallAverage = tempSum/howManyCalculations;
			}
			System.out.println("Averaga overall time: "+ overallAverage);
			System.out.println("Low: " + lowAverage);
			System.out.println("Medium: " + medAverage);
			System.out.println("High: " + highAverage);
		}



		private LocalDateTime stringToLDT(String date){
			if(date.equals("null 00:00:00")){
				date = "9999-12-30 00:00:00";
			}
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			LocalDateTime dateTime = LocalDateTime.parse(date, formatter);
			return dateTime;
		}

		private String ldtToString(LocalDateTime ldt){
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			String stringDate = ldt.format(formatter);
			return stringDate;
		}

		private long timeDiffString(String creationDate, String doneDate){
			LocalDateTime fromDate = stringToLDT(creationDate);
			LocalDateTime finishDate = stringToLDT(doneDate);
			//long minutes = ChronoUnit.MINUTES.between(fromDate, finishDate);
			long seconds = ChronoUnit.SECONDS.between(fromDate, finishDate);

			//Possible split point into different method, 
			long minutes = Math.floorDiv(seconds, 60);			//seconds/60 math.floor
			long restSeconds = seconds - (minutes*60);		//seconds for display = seconds - minutes *60
			//DisplayMinutes if less than 10, add 0 to the left, same for seconds
			String displayMinutes = Long.toString(minutes);
			String displaySeconds = Long.toString(restSeconds);
			if(minutes<10){
				displayMinutes= "0"+displayMinutes;
			} 
			if(restSeconds<10){
				displaySeconds= "0"+displaySeconds;
			} 

			System.out.println("Creation date: " + creationDate);
			System.out.println("Finish date: " + doneDate);
			System.out.println("Total seconds: " + seconds);
			System.out.println(displayMinutes + ":" + displaySeconds);
			//String
			return seconds;
		}

		String saveTodo(Todo todo){
			todo.setId(lastId+1);
			todo.setCreationDate(ldtToString(LocalDateTime.now()));
			todos.add(todo);
			lastId = lastId+1;
			//System.out.println("New last id: " +lastId);
			return "Todo created succesfully";
		}

		ArrayList<Todo> findAll(Map<String,String> allParams){
			//From allParams, filter todos arraylist
			/* Parameters:
				- page: for pagination
				- sortByPriority, low=low, high=high;	- DONE
				- sortByDate LocalDateTime a.isAfter(b), sooner, later
				- priority: low=0, med=1, high=2, all=3 - DONE
				- state:  undone=0, done=1, all=2,		- DONE
				- text: text content					- DONE
			*/
			//output from one filter is fed as input for next filter

			updateTimesArrays();
			ArrayList<Todo> filterdArray = (ArrayList)todos.clone();
			
			System.out.println(allParams);

			//Sort by priority
			if(allParams.containsKey("sortByPriority")) filterdArray = sortByPriority(filterdArray, allParams.get("sortByPriority"));

			//Sort by date
			if(allParams.containsKey("sortByDate")) filterdArray = sortByDate(filterdArray, allParams.get("sortByDate"));

			//Filter by priority
			if(allParams.containsKey("priority")) filterdArray = filterByPriority(filterdArray, allParams.get("priority"));
			
			//Filter by state (done/undone)
			if(allParams.containsKey("state")) filterdArray = filterByState(filterdArray, allParams.get("state"));

			//Filter by text
			if(allParams.containsKey("text")) filterdArray = filterByText(filterdArray, allParams.get("text"));

			return filterdArray;
		}

		private ArrayList<Todo> sortByDate(ArrayList<Todo> arraylist, String sortByDate){
			// - sortByPriority, low=low, high=high;
			Comparator<LocalDateTime> nullslastComparator = Comparator.nullsLast(Comparator.naturalOrder());
			if(sortByDate.equals("sooner")){
				//(a, b) -> stringToLDT(a.getDueDate()+" 00:00:00").compareTo(stringToLDT(b.getDueDate()+" 00:00:00"))
				//Converts todo.dueDate (String) into LocalDateTime object, then get compared
				arraylist.sort(
					Comparator.nullsLast(
					(a, b) -> stringToLDT(a.getDueDate()+" 00:00:00").compareTo(stringToLDT(b.getDueDate()+" 00:00:00"))
					)
				);
			} else{
				arraylist.sort(
					//(b, a) -> a.getDueDate().compareTo(b.getDueDate())
					Comparator.nullsLast(
						(a, b) -> stringToLDT(a.getDueDate()+" 00:00:00").compareTo(stringToLDT(b.getDueDate()+" 00:00:00"))
						)
				);
			}
			return arraylist;
		}

		private ArrayList<Todo> sortByPriority(ArrayList<Todo> arraylist, String sortByPriority){
			// - sortByPriority, low=low, high=high;
			if(sortByPriority.equals("low")){
				arraylist.sort(
					(a, b) -> String.valueOf(a.getPriority()).compareTo(String.valueOf(b.getPriority()))
				);
			} else{
				arraylist.sort(
					(b, a) -> String.valueOf(a.getPriority()).compareTo(String.valueOf(b.getPriority()))
				);
			}
			return arraylist;
		}

		private ArrayList<Todo> filterByPriority(ArrayList<Todo> arraylist, String priority){
			// - priority: low=0, med=1, high=2, all=3
			int priorityInt = Integer.valueOf(priority);
			if(priorityInt>=3){
				return arraylist;
			}
			arraylist.removeIf(e -> e.getPriority() != priorityInt);
			return arraylist;
		}
		
		private ArrayList<Todo> filterByState(ArrayList<Todo> arraylist, String state){
			// - state:  undone=0, done=1, all=2,
			int stateInt = Integer.valueOf(state);
			if(stateInt>=2){
				return arraylist;
			}
			boolean doneState = stateInt>=1;
			arraylist.removeIf(e -> e.isDoneState() != doneState);
			return arraylist;
		}
		
		private ArrayList<Todo> filterByText(ArrayList<Todo> arraylist, String text){
			System.out.println("Filter text: " + text);
			if(text.length()<=0){
				return arraylist;
			}
			// if todo.text doesn't contain text, remove from filtered array
			arraylist.removeIf(e -> !e.getText().toLowerCase().contains(text.toLowerCase()));
			return arraylist;
		}
		
		/*
		Response findPagination(Map<String,String> allParams){

			 * Return: 
			 *  - array[0, 9]
			 *  - Total number of todos
			 *  - Total number of todos after filters
			 *  - Total number of pages after filters: howManyTodos/10 -> Math.roundUp()/ceiling, etc...
			 *  - metrics
			 //Create a response object, todos, total numbers, metrics
			 Response response = new Response(todos, null, null)
			 List<Todo> paginatedList = todos.subList(0, 9);
			 return paginatedList;
			}
			
		*/
		String updateTodo(int id, Todo todo){
			System.out.println("Trying to update todo with id: " + id);
			System.out.println("Recieved request body: ");
			int elementIndex = getIndexFromId(id);
			if(elementIndex>-1){
				System.out.println("Found element with id: " + id + " at index: " +elementIndex);
				//todos.set(elementIndex, todo);
				todos.get(elementIndex).setText(todo.text);
				todos.get(elementIndex).setDueDate(todo.dueDate);
				todos.get(elementIndex).setPriority(todo.priority);
			} else{
				System.out.println("Couldn't find element with id: "+ id);
				return "Error: could not find To Do with id: '" +id +"'.";
			}
			return "To do updated successfully";
		}

		Todo markDone(int id){
			System.out.println("Trying to mark todo as done for id: " + id);
			int elementIndex = getIndexFromId(id);
			if(elementIndex>-1){
				System.out.println("Found element with id: " + id + " at index: " +elementIndex);
				//todos.set(elementIndex, todo);
				todos.get(elementIndex).setDoneState(true);
				//TODO: Set doneDate property to current date and time.
				//LocalDateTime now = LocalDateTime.now();
				todos.get(elementIndex).setDoneDate(ldtToString(LocalDateTime.now()));
				timeDiffString(todos.get(elementIndex).getCreationDate(), todos.get(elementIndex).getDoneDate());
			} else{
				System.out.println("Couldn't find element with id: "+ id);
			}
			return todos.get(elementIndex);
		} 

		Todo markUndone(int id){
			System.out.println("Trying to mark todo as undone for id: " + id);
			int elementIndex = getIndexFromId(id);
			if(elementIndex>-1){
				System.out.println("Found element with id: " + id + " at index: " +elementIndex);
				//todos.set(elementIndex, todo);
				todos.get(elementIndex).setDoneState(false);
				todos.get(elementIndex).setDoneDate(null);
				//TODO: Clear doneDate.
				todos.get(elementIndex).setDoneDate(null);
			} else{
				System.out.println("Couldn't find element with id: "+ id);
			}
			return todos.get(elementIndex);
		} 

		String deleteTodo(int id){
			//int arrIndex = todos.removeIf(null) ;
			todos.removeIf(e -> e.getId() == (id));
			return "To Do con ID: " + id + " eliminado correctamente!";
		}
	}

	static class Todo{
		private int id;
		private String text;
		private String dueDate;
		private boolean doneState;
		private String doneDate;
		private int priority;
		private String creationDate;

		public Todo(int id, String text, String dueDate, boolean doneState, String doneDate, int priority, String creationDate){
			this.id =id;
			this.text = text;
			this.dueDate = dueDate;
			this.doneState = doneState;
			this.doneDate = doneDate;
			this.priority = priority;
			this.creationDate = creationDate;
		}

		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getText() {
			return text;
		}
		public void setText(String text) {
			this.text = text;
		}
		public String getDueDate() {
			return dueDate;
		}
		public void setDueDate(String dueDate) {
			this.dueDate = dueDate;
		}
		public boolean isDoneState() {
			return doneState;
		}
		public void setDoneState(boolean doneState) {
			this.doneState = doneState;
		}
		public String getDoneDate() {
			return doneDate;
		}
		public void setDoneDate(String doneDate) {
			this.doneDate = doneDate;
		}
		public int getPriority() {
			return priority;
		}
		public void setPriority(int priority) {
			this.priority = priority;
		}
		public String getCreationDate() {
			return creationDate;
		}
		public void setCreationDate(String creationDate) {
			this.creationDate = creationDate;
		}
	}

	static class Response {
		ArrayList<Todo> data;
		Pagination pagination;
		Metrics metrics;
		public Response(ArrayList<Todo> data, Pagination pagination, Metrics metrics) {
			this.data = data;
			this.pagination = pagination;
			this.metrics = metrics;
		}
		public ArrayList<Todo> getData() {
			return data;
		}
		public void setData(ArrayList<Todo> data) {
			this.data = data;
		}
		public Pagination getPagination() {
			return pagination;
		}
		public void setPagination(Pagination pagination) {
			this.pagination = pagination;
		}
		public Metrics getMetrics() {
			return metrics;
		}
		public void setMetrics(Metrics metrics) {
			this.metrics = metrics;
		}

		
		
	}
	static class Pagination {
		int total_records;
		int current_page;
		int total_pages;
		int next_page;
		int prev_page;
		public Pagination(int total_records, int current_page, int total_pages, int next_page, int prev_page) {
			this.total_records = total_records;
			this.current_page = current_page;
			this.total_pages = total_pages;
			this.next_page = next_page;
			this.prev_page = prev_page;
		}
		public int getTotal_records() {
			return total_records;
		}
		public void setTotal_records(int total_records) {
			this.total_records = total_records;
		}
		public int getCurrent_page() {
			return current_page;
		}
		public void setCurrent_page(int current_page) {
			this.current_page = current_page;
		}
		public int getTotal_pages() {
			return total_pages;
		}
		public void setTotal_pages(int total_pages) {
			this.total_pages = total_pages;
		}
		public int getNext_page() {
			return next_page;
		}
		public void setNext_page(int next_page) {
			this.next_page = next_page;
		}
		public int getPrev_page() {
			return prev_page;
		}
		public void setPrev_page(int prev_page) {
			this.prev_page = prev_page;
		}

		
		
	}

	static class Metrics {
		String overallAverage;
		String lowPriorirtyAverage;
		String medPriorirtyAverage;
		String highPriorityAverage;

		public Metrics(String overallAverage, String lowPriorirtyAverage, String medPriorirtyAverage,
				String highPriorityAverage) {
			this.overallAverage = overallAverage;
			this.lowPriorirtyAverage = lowPriorirtyAverage;
			this.medPriorirtyAverage = medPriorirtyAverage;
			this.highPriorityAverage = highPriorityAverage;
		}

		public String getOverallAverage() {
			return overallAverage;
		}

		public void setOverallAverage(String overallAverage) {
			this.overallAverage = overallAverage;
		}

		public String getLowPriorirtyAverage() {
			return lowPriorirtyAverage;
		}

		public void setLowPriorirtyAverage(String lowPriorirtyAverage) {
			this.lowPriorirtyAverage = lowPriorirtyAverage;
		}

		public String getMedPriorirtyAverage() {
			return medPriorirtyAverage;
		}

		public void setMedPriorirtyAverage(String medPriorirtyAverage) {
			this.medPriorirtyAverage = medPriorirtyAverage;
		}

		public String getHighPriorityAverage() {
			return highPriorityAverage;
		}

		public void setHighPriorityAverage(String highPriorityAverage) {
			this.highPriorityAverage = highPriorityAverage;
		}

		
	}


}