package com.todoapp.todoapp.models;

public class Todo {
    
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
