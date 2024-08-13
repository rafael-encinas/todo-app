import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { NewTodoModal } from "../src/features/components/NewTodoModal";

const mockToggleModal = vi.fn();
const mockOnAddTodo = vi.fn();
describe('NewToDoModal', () => {
    it('renders NewTodoModal', () => {
      render(
          <NewTodoModal
          onAddTodo={mockOnAddTodo}
          toggleModal={mockToggleModal}
          />    
      );
      });
      screen.debug();

      it('should be able to type in text input', () => {
        render(
            <NewTodoModal
            onAddTodo={mockOnAddTodo}
            toggleModal={mockToggleModal}
            />    
        );
        const textInputElement = screen.getByPlaceholderText('Finish project!');
        fireEvent.change(textInputElement, { target: { value: "Go to school" } } )
        expect(textInputElement.value).toBe("Go to school");
        });
        screen.debug();

        it('should be able to set priority to medium', () => {
            render(
                <NewTodoModal
                onAddTodo={mockOnAddTodo}
                toggleModal={mockToggleModal}
                />    
            );
            const priorityInputElement = screen.getByLabelText("Priority:");
            fireEvent.change(priorityInputElement, { target: { value: "2" } } )
            expect(priorityInputElement.value).toBe("2");
            });
        screen.debug();

        it('should be able to set a dueDate', () => {
            render(
                <NewTodoModal
                onAddTodo={mockOnAddTodo}
                toggleModal={mockToggleModal}
                />    
            );
            const dueDateInputElement = screen.getByLabelText("Due Date:");
            fireEvent.change(dueDateInputElement, { target: { value: "2024-08-12" } } )
            expect(dueDateInputElement.value).toBe("2024-08-12");
            });
        screen.debug();

        it('should be able to submit todo when text and priority are acceptable', () => {
            render(
                <NewTodoModal
                onAddTodo={mockOnAddTodo}
                toggleModal={mockToggleModal}
                />    
            );
            const textInputElement = screen.getByPlaceholderText('Finish project!');
            fireEvent.change(textInputElement, { target: { value: "Go to school" } } )

            const priorityInputElement = screen.getByLabelText("Priority:");
            fireEvent.change(priorityInputElement, { target: { value: "2" } } )

            const submitButtonElement = screen.getByText("Save");
            fireEvent.click(submitButtonElement);
            expect(mockOnAddTodo).toBeCalled();
            });
        screen.debug();

        it('should close modal when clicking on "Cancel" button', () => {
            render(
                <NewTodoModal
                onAddTodo={mockOnAddTodo}
                toggleModal={mockToggleModal}
                />    
            );
            const textInputElement = screen.getByPlaceholderText('Finish project!');
            fireEvent.change(textInputElement, { target: { value: "Go to school" } } )

            const priorityInputElement = screen.getByLabelText("Priority:");
            fireEvent.change(priorityInputElement, { target: { value: "2" } } )

            const cancelButtonElement = screen.getByText("Cancel");
            fireEvent.click(cancelButtonElement);
            expect(mockToggleModal).toBeCalled();
            });
        screen.debug();

            

});