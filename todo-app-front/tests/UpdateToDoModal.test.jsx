import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { UpdateToDoModal } from '../src/features/components/UpdateToDoModal';

const mockToggleUpdateModal = vi.fn();
const mockOnUpdateTodo = vi.fn();
const mockTodo = {
    id: 1,
    text: 'Test Todo',
    dueDate: '2024-11-29',
    priority: 1,
  };

describe('UpdateToDoModal Component', () => {

    it('renders UpdateToDoModal', () => {
        render(
            <UpdateToDoModal
            toggleUpdateModal={mockToggleUpdateModal}
            toDo = {mockTodo}
            onUpdateTodo={mockOnUpdateTodo}
            />    
        );
        });
        screen.debug();

    it('should display the mockTodo information in the inputs', () => {
        render(
            <UpdateToDoModal
                toggleUpdateModal={mockToggleUpdateModal}
                toDo={mockTodo}
                onUpdateTodo={mockOnUpdateTodo}
            />
        );

        const textInputElement = screen.getByDisplayValue('Test Todo');
        const dueDateInputElement = screen.getByDisplayValue('2024-11-29');
        const priorityInputElement = screen.getByDisplayValue('Medium');

        expect(textInputElement).toBeInTheDocument();
        expect(dueDateInputElement).toBeInTheDocument();
        expect(priorityInputElement).toBeInTheDocument();
    });
    screen.debug();

    it('should be able to type in text input', () => {
        render(
            <UpdateToDoModal
                toggleUpdateModal={mockToggleUpdateModal}
                toDo={mockTodo}
                onUpdateTodo={mockOnUpdateTodo}
            />
        );
        const textInputElement = screen.getByDisplayValue('Test Todo');
        fireEvent.change(textInputElement, { target: { value: "Go to school" } });
        expect(textInputElement.value).toBe("Go to school");
    });
    screen.debug();

    it('should be able to set priority to medium', () => {
        render(
            <UpdateToDoModal
                toggleUpdateModal={mockToggleUpdateModal}
                toDo={mockTodo}
                onUpdateTodo={mockOnUpdateTodo}
            />
        );
        const priorityInputElement = screen.getByLabelText("Priority:");
        fireEvent.change(priorityInputElement, { target: { value: "2" } });
        expect(priorityInputElement.value).toBe("2");
    });
    screen.debug();

    it('should call mockOnUpdateTodo when clicking on the "Save" button', () => {
        render(
            <UpdateToDoModal
                toggleUpdateModal={mockToggleUpdateModal}
                toDo={mockTodo}
                onUpdateTodo={mockOnUpdateTodo}
            />
        );
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
        expect(mockOnUpdateTodo).toHaveBeenCalled();
    });
    screen.debug();

    it('should call mockToggleUpdateModal when clicking on the "Cancel" button', () => {
        render(
            <UpdateToDoModal
                toggleUpdateModal={mockToggleUpdateModal}
                toDo={mockTodo}
                onUpdateTodo={mockOnUpdateTodo}
            />
        );
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);
        expect(mockToggleUpdateModal).toHaveBeenCalled();
    });
    screen.debug();

    it('should call mockToggleUpdateModal when clicking on the "Save" button', () => {
        render(
            <UpdateToDoModal
                toggleUpdateModal={mockToggleUpdateModal}
                toDo={mockTodo}
                onUpdateTodo={mockOnUpdateTodo}
            />
        );
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
        expect(mockToggleUpdateModal).toHaveBeenCalled();
    });
    screen.debug();

});