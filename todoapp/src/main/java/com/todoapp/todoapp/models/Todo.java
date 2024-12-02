package com.todoapp.todoapp.models;

/**
 * Represents a Todo item.
 */
public class Todo {
	
	private int id;
	private String text;
	private String dueDate;
	private boolean doneState;
	private String doneDate;
	private int priority;
	private String creationDate;

	/**
	 * Constructs a Todo object with the specified parameters.
	 * 
	 * @param id           the ID of the Todo item
	 * @param text         the text description of the Todo item
	 * @param dueDate      the due date of the Todo item
	 * @param doneState    the completion state of the Todo item
	 * @param doneDate     the completion date of the Todo item
	 * @param priority     the priority of the Todo item
	 * @param creationDate the creation date of the Todo item
	 */
	public Todo(int id, String text, String dueDate, boolean doneState, String doneDate, int priority, String creationDate) {
		this.id = id;
		this.text = text;
		this.dueDate = dueDate;
		this.doneState = doneState;
		this.doneDate = doneDate;
		this.priority = priority;
		this.creationDate = creationDate;
	}

	/**
	 * Constructs an empty Todo object.
	 */
	public Todo() {

	}

	/**
	 * Returns the ID of the Todo item.
	 * 
	 * @return the ID of the Todo item
	 */
	public int getId() {
		return id;
	}

	/**
	 * Sets the ID of the Todo item.
	 * 
	 * @param id the ID of the Todo item
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * Returns the text description of the Todo item.
	 * 
	 * @return the text description of the Todo item
	 */
	public String getText() {
		return text;
	}

	/**
	 * Sets the text description of the Todo item.
	 * 
	 * @param text the text description of the Todo item
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * Returns the due date of the Todo item.
	 * 
	 * @return the due date of the Todo item
	 */
	public String getDueDate() {
		return dueDate;
	}

	/**
	 * Sets the due date of the Todo item.
	 * 
	 * @param dueDate the due date of the Todo item
	 */
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	/**
	 * Returns the completion state of the Todo item.
	 * 
	 * @return the completion state of the Todo item
	 */
	public boolean isDoneState() {
		return doneState;
	}

	/**
	 * Sets the completion state of the Todo item.
	 * 
	 * @param doneState the completion state of the Todo item
	 */
	public void setDoneState(boolean doneState) {
		this.doneState = doneState;
	}

	/**
	 * Returns the completion date of the Todo item.
	 * 
	 * @return the completion date of the Todo item
	 */
	public String getDoneDate() {
		return doneDate;
	}

	/**
	 * Sets the completion date of the Todo item.
	 * 
	 * @param doneDate the completion date of the Todo item
	 */
	public void setDoneDate(String doneDate) {
		this.doneDate = doneDate;
	}

	/**
	 * Returns the priority of the Todo item.
	 * 
	 * @return the priority of the Todo item
	 */
	public int getPriority() {
		return priority;
	}

	/**
	 * Sets the priority of the Todo item.
	 * 
	 * @param priority the priority of the Todo item
	 */
	public void setPriority(int priority) {
		this.priority = priority;
	}

	/**
	 * Returns the creation date of the Todo item.
	 * 
	 * @return the creation date of the Todo item
	 */
	public String getCreationDate() {
		return creationDate;
	}

	/**
	 * Sets the creation date of the Todo item.
	 * 
	 * @param creationDate the creation date of the Todo item
	 */
	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}
}
