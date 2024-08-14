package com.todoapp.todoapp;

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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	@CrossOrigin
	@RequestMapping("/api/todos")
	static class TodoResource {
		private final TodosInMemoryRepository repository;

		TodoResource(TodosInMemoryRepository repository){
			this.repository = repository;
		}

		@CrossOrigin(origins = "http://localhost:8080")
		@GetMapping
		public ResponseEntity<Response> findPagination(@RequestParam Map<String,String> allParams){
			Response response = repository.findPagination(allParams);
            return ResponseEntity.ok(response);
		}

		//@CrossOrigin(origins = "http://localhost:8080")
		@GetMapping(value = "/getall")
		public ResponseEntity<ArrayList<Todo>> findAll(@RequestParam Map<String,String> allParams){
			ArrayList<Todo> todos = repository.findAll();
			if (todos.isEmpty()){
				System.out.println("todos is empty!");
                return ResponseEntity.noContent().build();
			}
            return ResponseEntity.ok(todos);
		}
		
	//	@CrossOrigin(origins = "http://localhost:8080")
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
				return ResponseEntity.ok(todoPostError);
			}
			
			boolean prioritySetCheck = false;
			if(todo.getPriority() <= 2 && todo.getPriority() >= 0) {
				prioritySetCheck = true;
			} else{
				todoPostError.setText("Error: Priority must between 0 and 2. Try again");
				todoPostError.setId(-1);
				return ResponseEntity.ok(todoPostError);
			}
			return ResponseEntity.ok(repository.saveTodo(todo));

		}

	//	@CrossOrigin(origins = "http://localhost:8080")
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
				return ResponseEntity.ok(todoPostError);
			}
			boolean prioritySetCheck = false;
			if(todo.getPriority() <= 2 && todo.getPriority() >= 0) {
				prioritySetCheck = true;
			} else{
				todoPostError.setText("Error: Priority must between 0 and 2. Try again");
				todoPostError.setId(-1);
				return ResponseEntity.ok(todoPostError);
			}
			return ResponseEntity.ok(repository.updateTodo(id, todo));
			}

		//Post /todos/{id}/done to mark "todo" as done
	//	@CrossOrigin(origins = "http://localhost:8080")
		@PostMapping("/{id}/done")
		public ResponseEntity<Todo> markDone(@PathVariable int id) {
			return ResponseEntity.ok(repository.markDone(id));
		}
		
		//Put /todos/{id}/undone to mark "todo" as undone
	//	@CrossOrigin(origins = "http://localhost:8080")
		@PutMapping("/{id}/undone")
		public ResponseEntity<Todo> markUndone(@PathVariable int id) {
			return ResponseEntity.ok(repository.markUndone(id));
		}

	//	@CrossOrigin(origins = "http://localhost:8080")
		@DeleteMapping(value = "/{id}")
		public ResponseEntity<Todo> deleteTodo(@PathVariable("id") int id){
			return ResponseEntity.ok(repository.deleteTodo(id));
		}
	}

	@Repository
	static class TodosInMemoryRepository {
		private ArrayList<Todo> todos = new ArrayList<>();
		
		int lastId=0;
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
			//If any todo changed from done to undone, arrays must be reformed
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
				date = "9999-12-30 00:00:00";	//Used when sorting todos by dueDate, if dueDate = null -> push to the end of time
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
			//Get time difference in seconds
			long seconds = ChronoUnit.SECONDS.between(fromDate, finishDate);
			return seconds;
		}

		private String timeDiffStringFormatter(long seconds){
			long minutes = Math.floorDiv(seconds, 60);
			long restSeconds = seconds - (minutes*60);
			//DisplayMinutes if less than 10, add 0 to the left, same for seconds
			String displayMinutes = Long.toString(minutes);
			String displaySeconds = Long.toString(restSeconds);
			if(minutes<10){
				displayMinutes= "0"+displayMinutes;
			} 
			if(restSeconds<10){
				displaySeconds= "0"+displaySeconds;
			} 
			return displayMinutes + ":" + displaySeconds;
		}

		Todo saveTodo(Todo todo){
			todo.setId(lastId+1);
			todo.setCreationDate(ldtToString(LocalDateTime.now()));
			todos.add(todo);
			lastId = lastId+1;
			return todo; //"Todo created succesfully";
		}

		ArrayList<Todo> findAll(){
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
			
			/* 
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
			*/
			return filterdArray;
		}

		private ArrayList<Todo> sortByDate(ArrayList<Todo> arraylist, String sortByDate){
			// - sortByDate, sooner dates first = "sooner", later dates first= anything else
			if(sortByDate.equals("sooner")){
				arraylist.sort(
					Comparator.nullsLast(
					(a, b) -> stringToLDT(a.getDueDate()+" 00:00:00").compareTo(stringToLDT(b.getDueDate()+" 00:00:00"))
					)
				);
			} else if(sortByDate.equals("later")){
				arraylist.sort(
					Comparator.nullsLast(
						(b, a) -> stringToLDT(a.getDueDate()+" 00:00:00").compareTo(stringToLDT(b.getDueDate()+" 00:00:00"))
						)
				);
			}
			return arraylist;
		}

		private ArrayList<Todo> sortByPriority(ArrayList<Todo> arraylist, String sortByPriority){
			// - sortByPriority, low=low, high=anything else;
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
		
		Response findPagination(Map<String,String> allParams){			
			/*
			 * Return: 
			 *  - array[0, 9]
			 *  - Total number of todos
			 *  - Total number of todos after filters
			 *  - metrics
			 */
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
			//filtered array must be split for pagination before being attached to response object
			int currentPage; 
			if(allParams.containsKey("page")) {
				currentPage = Integer.valueOf(allParams.get("page"));
			} else{
				currentPage = 1;
			}
			//Number of elements per page= 10
			int howManyElements = 10;
			int fromIndex = 0 + (howManyElements*(currentPage-1));
			int toIndex = 10 + (howManyElements*(currentPage-1));
			//If the number of elements for the last page is less than 10, change toIndex
			if(toIndex>filterdArray.size()){
				toIndex = filterdArray.size();
			}
			System.out.println("******************************");
			System.out.println("CurrentPage: " + currentPage);
			System.out.println("FromIndex: " + fromIndex);
			System.out.println("ToIndex: " + toIndex);

			List<Todo> paginatedList = filterdArray.subList(fromIndex, toIndex);
			int totalPages = (int) Math.ceil(filterdArray.size()/10.0);
			//null values kept crashing the API, handle -1 and -2 values on the frontend
			Integer nextPage = currentPage+1 <= totalPages ? currentPage+1 : -1;
			Integer prevPage = currentPage-1 >= 1 ? currentPage-1 : -2;
			
			System.out.println("******************************");
			System.out.println("TotalPages: " + totalPages);
			System.out.println("NetPage: " + nextPage);
			System.out.println("PrevPage: " + prevPage);
			
			Pagination pagination = new Pagination(todos.size(),filterdArray.size(),currentPage, totalPages, nextPage, prevPage);

			//Get average times in a nice format -> mm:ss
			String metricsOverallAvg = timeDiffStringFormatter(overallAverage);
			String metricsLowAvg = timeDiffStringFormatter(lowAverage);
			String metricsMedAvg = timeDiffStringFormatter(medAverage);
			String metricsHighAvg = timeDiffStringFormatter(highAverage);

			Metrics metrics = new Metrics(metricsOverallAvg, metricsLowAvg, metricsMedAvg, metricsHighAvg);

			Response response = new Response(paginatedList, pagination, metrics);
			 return response;
			}
			
		Todo updateTodo(int id, Todo todo){
			System.out.println("Trying to update todo with id: " + id);
			//Look for todo with id=id, gets a -1 if not found
			int elementIndex = getIndexFromId(id);
			if(elementIndex>-1){
				System.out.println("Found element with id: " + id + " at index: " +elementIndex);
				todos.get(elementIndex).setText(todo.text);
				todos.get(elementIndex).setDueDate(todo.dueDate);
				todos.get(elementIndex).setPriority(todo.priority);
			} else{
				System.out.println("Couldn't find element with id: "+ id);
				//return "Error: could not find To Do with id: '" +id +"'.";
			}
			return todos.get(elementIndex);
		}

		Todo markDone(int id){
			System.out.println("Trying to mark todo as done for id: " + id);
			int elementIndex = getIndexFromId(id);
			if(elementIndex>-1){
				System.out.println("Found element with id: " + id + " at index: " +elementIndex);
				todos.get(elementIndex).setDoneState(true);
				todos.get(elementIndex).setDoneDate(ldtToString(LocalDateTime.now()));
				timeDiffString(todos.get(elementIndex).getCreationDate(), todos.get(elementIndex).getDoneDate());
			} else{
				Todo todoError = new Todo();
				todoError.setText("Error: couldn't find To Do with id: " + id + ", please try a different id.");
				todoError.setId(-1);
				return todoError;
			}
			return todos.get(elementIndex);
		} 

		Todo markUndone(int id){
			System.out.println("Trying to mark todo as undone for id: " + id);
			int elementIndex = getIndexFromId(id);
			if(elementIndex>-1){
				System.out.println("Found element with id: " + id + " at index: " +elementIndex);
				todos.get(elementIndex).setDoneState(false);
				todos.get(elementIndex).setDoneDate(null);
				todos.get(elementIndex).setDoneDate(null);
			} else{
				System.out.println("Couldn't find element with id: "+ id);
				Todo todoError = new Todo();
				todoError.setText("Error: couldn't find To Do with id: " + id + ", please try a different id.");
				todoError.setId(-1);
				return todoError;
			}
			return todos.get(elementIndex);
		} 

		Todo deleteTodo(int id){
			int elementIndex = getIndexFromId(id);
			Todo todoToDelete = new Todo();
			if(elementIndex>-1){
				todoToDelete = todos.get(elementIndex);
				todos.removeIf(e -> e.getId() == (id));
			} else{
				//todoToDelete.setText("Todo not found");
				Todo todoError = new Todo();
				todoError.setText("Error: couldn't find To Do with id: " + id + ", please try a different id.");
				todoError.setId(-1);
				return todoError;
			}
			return todoToDelete;
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

		public Todo(){

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
		List<Todo> data;
		Pagination pagination;
		Metrics metrics;
		public Response(List<Todo> data, Pagination pagination, Metrics metrics) {
			this.data = data;
			this.pagination = pagination;
			this.metrics = metrics;
		}

		public Response(){

		}
		public List<Todo> getData() {
			return data;
		}
		public void setData(List<Todo> data) {
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
		int total_filtered;
		int current_page;
		int total_pages;
		Integer next_page;
		Integer prev_page;

		public Pagination(int total_records, int total_filtered, int current_page, int total_pages, Integer next_page,
				Integer prev_page) {
			this.total_records = total_records;
			this.total_filtered = total_filtered;
			this.current_page = current_page;
			this.total_pages = total_pages;
			this.next_page = next_page;
			this.prev_page = prev_page;
		}

		public Pagination(){

		}

		public int getTotal_records() {
			return total_records;
		}
		public void setTotal_records(int total_records) {
			this.total_records = total_records;
		}
		public int getTotal_filtered() {
			return total_filtered;
		}
		public void setTotal_filtered(int total_filtered) {
			this.total_filtered = total_filtered;
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
		public void setNext_page(Integer next_page) {
			this.next_page = next_page;
		}
		public Integer getPrev_page() {
			return prev_page;
		}
		public void setPrev_page(Integer prev_page) {
			this.prev_page = prev_page;
		}
	}

	static class Metrics {
		String overallAverage;
		String lowPriorityAverage;
		String medPriorityAverage;
		String highPriorityAverage;

		public Metrics(String overallAverage, String lowPriorityAverage, String medPriorityAverage,
				String highPriorityAverage) {
			this.overallAverage = overallAverage;
			this.lowPriorityAverage = lowPriorityAverage;
			this.medPriorityAverage = medPriorityAverage;
			this.highPriorityAverage = highPriorityAverage;
		}

		public Metrics(){

		}

		public String getOverallAverage() {
			return overallAverage;
		}

		public void setOverallAverage(String overallAverage) {
			this.overallAverage = overallAverage;
		}

		public String getLowPriorityAverage() {
			return lowPriorityAverage;
		}

		public void setLowPriorityAverage(String lowPriorityAverage) {
			this.lowPriorityAverage = lowPriorityAverage;
		}

		public String getMedPriorityAverage() {
			return medPriorityAverage;
		}

		public void setMedPriorityAverage(String medPriorityAverage) {
			this.medPriorityAverage = medPriorityAverage;
		}

		public String getHighPriorityAverage() {
			return highPriorityAverage;
		}

		public void setHighPriorityAverage(String highPriorityAverage) {
			this.highPriorityAverage = highPriorityAverage;
		}
	}

}
