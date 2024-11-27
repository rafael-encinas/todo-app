package com.todoapp.todoapp.repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import com.todoapp.todoapp.models.Metrics;
import com.todoapp.todoapp.models.Pagination;
import com.todoapp.todoapp.models.Response;
import com.todoapp.todoapp.models.Todo;

import org.springframework.stereotype.Repository;

@Repository
public class TodosInMemoryRepository {

	public TodosInMemoryRepository(){}
    
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
						//Get time difference in seconds and store it
						lowPriorityTimes.add(timeDiffString(todos.get(j).getCreationDate(), todos.get(j).getDoneDate()));	
					} else if(todos.get(j).getPriority()==1){
						//Get time difference in seconds and store it
						medPriorityTimes.add(timeDiffString(todos.get(j).getCreationDate(), todos.get(j).getDoneDate()));	
					} else{
						//Get time difference in seconds and store it
						highPriorityTimes.add(timeDiffString(todos.get(j).getCreationDate(), todos.get(j).getDoneDate()));	
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

			//System.out.println("Averaga overall time: "+ overallAverage);
			///System.out.println("Low: " + lowAverage);
			//System.out.println("Medium: " + medAverage);
			//System.out.println("High: " + highAverage);
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

		public Todo saveTodo(Todo todo){
			todo.setId(lastId+1);
			todo.setCreationDate(ldtToString(LocalDateTime.now()));
			todos.add(todo);
			lastId = lastId+1;
			return todo; //"Todo created succesfully";
		}

		public ArrayList<Todo> findAll(){
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
			//System.out.println("Filter text: " + text);
			if(text.length()<=0){
				return arraylist;
			}
			// if todo.text doesn't contain text, remove from filtered array
			arraylist.removeIf(e -> !e.getText().toLowerCase().contains(text.toLowerCase()));
			return arraylist;
		}
		
		public Response findPagination(Map<String,String> allParams){			
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
			//System.out.println(allParams);
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

			List<Todo> paginatedList = filterdArray.subList(fromIndex, toIndex);
			int totalPages = (int) Math.ceil(filterdArray.size()/10.0);
			//null values kept crashing the API, handle -1 and -2 values on the frontend
			Integer nextPage = currentPage+1 <= totalPages ? currentPage+1 : -1;
			Integer prevPage = currentPage-1 >= 1 ? currentPage-1 : -2;
			
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
			
		public Todo updateTodo(int id, Todo todo){
			//Look for todo with id=id, gets a -1 if not found
			int elementIndex = getIndexFromId(id);
			if(elementIndex>-1){
				todos.get(elementIndex).setText(todo.getText());
				todos.get(elementIndex).setDueDate(todo.getDueDate());
				todos.get(elementIndex).setPriority(todo.getPriority());
			} else{
				Todo todoError = new Todo();
				todoError.setText("Error: couldn't find To Do with id: " + id + ", please try a different id.");
				todoError.setId(-1);
				return todoError;
			}
			return todos.get(elementIndex);
		}

		public Todo markDone(int id){
			//System.out.println("Trying to mark todo as done for id: " + id);
			int elementIndex = getIndexFromId(id);
			if(elementIndex>-1){
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

		public Todo markUndone(int id){
			//System.out.println("Trying to mark todo as undone for id: " + id);
			int elementIndex = getIndexFromId(id);
			if(elementIndex>-1){
				//System.out.println("Found element with id: " + id + " at index: " +elementIndex);
				todos.get(elementIndex).setDoneState(false);
				todos.get(elementIndex).setDoneDate(null);
				todos.get(elementIndex).setDoneDate(null);
			} else{
				//System.out.println("Couldn't find element with id: "+ id);
				Todo todoError = new Todo();
				todoError.setText("Error: couldn't find To Do with id: " + id + ", please try a different id.");
				todoError.setId(-1);
				return todoError;
			}
			return todos.get(elementIndex);
		} 

		public Todo deleteTodo(int id){
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
