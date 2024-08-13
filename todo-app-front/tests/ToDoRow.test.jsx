import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { ToDoRow } from "../src/features/components/ToDoRow"
import { UpdateToDoModal } from '../src/features/components/UpdateToDoModal';

const mockOnGetFilteredData = vi.fn();
const mockOnDeleteTodo = vi.fn();
const mockOnUpdateTodo = vi.fn();
const mockOnMarkTodo = vi.fn();
const mockUnmarkTodo = vi.fn();
const mockMarkDone = vi.fn();

const markDone = mockMarkDone;

describe("ToDoRow",()=>{
    it('should render ToDoRow', ()=>{
        render(
            <table>
            <thead>
              <tr>
                <td className='colState'>State</td>
                <td className='colName'>Name</td>
                <td className='colPriority'>Priority
                  </td>
                <td className='colDueDate'>Due Date
                </td>
                <td className='colActions'>Actions</td>
              </tr>
            </thead>
            <tbody>
            <ToDoRow
            onGetFilteredData={mockOnGetFilteredData}
            onDeleteTodo = {mockOnDeleteTodo}
            toDo = {{
                id: 1,
                text: "This is a mock todo",
                dueDate: null,
                doneState: false,
                doneDate: null,
                priority: 0,
                creationDate: "2024-08-12 21:21:57"
            }}
            onUpdateTodo={mockOnUpdateTodo}
            onMarkTodo={mockOnMarkTodo}
            onUnmarkTodo={mockUnmarkTodo}
            />
            </tbody>
          </table> 
        )
    });
    screen.debug();

    it('should assign done state to checkbox', ()=>{
        render(
            <table>
            <thead>
              <tr>
                <td className='colState'>State</td>
                <td className='colName'>Name</td>
                <td className='colPriority'>Priority
                  </td>
                <td className='colDueDate'>Due Date
                </td>
                <td className='colActions'>Actions</td>
              </tr>
            </thead>
            <tbody>
            <ToDoRow
            onGetFilteredData={mockOnGetFilteredData}
            onDeleteTodo = {mockOnDeleteTodo}
            toDo = {{
                id: 1,
                text: "This is a mock todo",
                dueDate: null,
                doneState: false,
                doneDate: null,
                priority: 0,
                creationDate: "2024-08-12 21:21:57"
            }}
            onUpdateTodo={mockOnUpdateTodo}
            onMarkTodo={mockOnMarkTodo}
            onUnmarkTodo={mockUnmarkTodo}
            />
            </tbody>
          </table> 
        )
        const checkboxElement = screen.getByTestId('checkbox-test');
        expect(checkboxElement).toBeInTheDocument();
        expect(checkboxElement.checked).toBe(false);
    });//test end
    screen.debug();

    it('should assign text to table cell to checkbox', ()=>{
        render(
            <table>
            <thead>
              <tr>
                <td className='colState'>State</td>
                <td className='colName'>Name</td>
                <td className='colPriority'>Priority
                  </td>
                <td className='colDueDate'>Due Date
                </td>
                <td className='colActions'>Actions</td>
              </tr>
            </thead>
            <tbody>
            <ToDoRow
            onGetFilteredData={mockOnGetFilteredData}
            onDeleteTodo = {mockOnDeleteTodo}
            toDo = {{
                id: 1,
                text: "This is a mock todo",
                dueDate: null,
                doneState: false,
                doneDate: null,
                priority: 0,
                creationDate: "2024-08-12 21:21:57"
            }}
            onUpdateTodo={mockOnUpdateTodo}
            onMarkTodo={mockOnMarkTodo}
            onUnmarkTodo={mockUnmarkTodo}
            />
            </tbody>
          </table> 
        )
        const textTableCellElement = screen.getByTestId('text-test');
        expect(textTableCellElement).toBeInTheDocument();
        expect(textTableCellElement.textContent).toBe("This is a mock todo");
    });//test end
    screen.debug();

    it('should set "Low" string to priority table cell', ()=>{
        render(
            <table>
            <thead>
              <tr>
                <td className='colState'>State</td>
                <td className='colName'>Name</td>
                <td className='colPriority'>Priority
                  </td>
                <td className='colDueDate'>Due Date
                </td>
                <td className='colActions'>Actions</td>
              </tr>
            </thead>
            <tbody>
            <ToDoRow
            onGetFilteredData={mockOnGetFilteredData}
            onDeleteTodo = {mockOnDeleteTodo}
            toDo = {{
                id: 1,
                text: "This is a mock todo",
                dueDate: null,
                doneState: false,
                doneDate: null,
                priority: 0,
                creationDate: "2024-08-12 21:21:57"
            }}
            onUpdateTodo={mockOnUpdateTodo}
            onMarkTodo={mockOnMarkTodo}
            onUnmarkTodo={mockUnmarkTodo}
            />
            </tbody>
          </table> 
        )
        const priorityTableCellElement = screen.getByTestId('priority-test');
        expect(priorityTableCellElement).toBeInTheDocument();
        expect(priorityTableCellElement.textContent).toBe("Low");
    });//test end
    screen.debug();

    it('should set "-" string to dueDate table cell', ()=>{
        render(
            <table>
            <thead>
              <tr>
                <td className='colState'>State</td>
                <td className='colName'>Name</td>
                <td className='colPriority'>Priority
                  </td>
                <td className='colDueDate'>Due Date
                </td>
                <td className='colActions'>Actions</td>
              </tr>
            </thead>
            <tbody>
            <ToDoRow
            onGetFilteredData={mockOnGetFilteredData}
            onDeleteTodo = {mockOnDeleteTodo}
            toDo = {{
                id: 1,
                text: "This is a mock todo",
                dueDate: null,
                doneState: false,
                doneDate: null,
                priority: 0,
                creationDate: "2024-08-12 21:21:57"
            }}
            onUpdateTodo={mockOnUpdateTodo}
            onMarkTodo={mockOnMarkTodo}
            onUnmarkTodo={mockUnmarkTodo}
            />
            </tbody>
          </table> 
        )
        const dueDateTableCellElement = screen.getByTestId('dueDate-test');
        expect(dueDateTableCellElement).toBeInTheDocument();
        expect(dueDateTableCellElement.textContent).toBe("-");
    });//test end
    screen.debug();

    it('should render "UpdateTodoModal" component when clicking on Edit, and be filled with todo data', ()=>{
        render(
            <table>
            <thead>
              <tr>
                <td className='colState'>State</td>
                <td className='colName'>Name</td>
                <td className='colPriority'>Priority
                  </td>
                <td className='colDueDate'>Due Date
                </td>
                <td className='colActions'>Actions</td>
              </tr>
            </thead>
            <tbody>
            <ToDoRow
            onGetFilteredData={mockOnGetFilteredData}
            onDeleteTodo = {mockOnDeleteTodo}
            toDo = {{
                id: 1,
                text: "This is a mock todo",
                dueDate: null,
                doneState: false,
                doneDate: null,
                priority: 0,
                creationDate: "2024-08-12 21:21:57"
            }}
            onUpdateTodo={mockOnUpdateTodo}
            onMarkTodo={mockOnMarkTodo}
            onUnmarkTodo={mockUnmarkTodo}
            />
            </tbody>
          </table> 
        )

        function updateTodo(){
            console.log("Clicked on delete todo for id:");
            //toggleUpdateModal()
          }



        const editButtonElement = screen.getByText("Edit");
        expect(editButtonElement).toBeInTheDocument();
        const modalTableCellElement = screen.getByTestId('modalLocation-test')
        fireEvent.click(editButtonElement);
        //Check for values inside UpdateModal to match todo data
        const updateModalTextInput = screen.getByLabelText("Text: (Maximum 120 characters allowed)");
        expect(updateModalTextInput).toBeInTheDocument();
        expect(updateModalTextInput.value).toBe("This is a mock todo");

        const updateModalPriorityInput = screen.getByLabelText("Priority:");
        expect(updateModalPriorityInput).toBeInTheDocument();
        expect(updateModalPriorityInput.value).toBe("0");

        const updateModalDueDateInput = screen.getByLabelText("Due Date:");
        expect(updateModalDueDateInput).toBeInTheDocument();
        expect(updateModalDueDateInput.value).toBe("");

    });//test end
    screen.debug();

    it('should invoke "onDeleteTodo" when clicking on Delete button', ()=>{
        render(
            <table>
            <thead>
              <tr>
                <td className='colState'>State</td>
                <td className='colName'>Name</td>
                <td className='colPriority'>Priority
                  </td>
                <td className='colDueDate'>Due Date
                </td>
                <td className='colActions'>Actions</td>
              </tr>
            </thead>
            <tbody>
            <ToDoRow
            onGetFilteredData={mockOnGetFilteredData}
            onDeleteTodo = {mockOnDeleteTodo}
            toDo = {{
                id: 1,
                text: "This is a mock todo",
                dueDate: null,
                doneState: false,
                doneDate: null,
                priority: 0,
                creationDate: "2024-08-12 21:21:57"
            }}
            onUpdateTodo={mockOnUpdateTodo}
            onMarkTodo={mockOnMarkTodo}
            onUnmarkTodo={mockUnmarkTodo}
            />
            </tbody>
          </table> 
        )

        function updateTodo(){
            console.log("Clicked on delete todo for id:");
            //toggleUpdateModal()
          }

        const deleteButtonElement = screen.getByText("Delete");
        expect(deleteButtonElement).toBeInTheDocument();
        fireEvent.click(deleteButtonElement);
        expect(mockOnDeleteTodo).toBeCalled();
    });//test end
    screen.debug();

});
