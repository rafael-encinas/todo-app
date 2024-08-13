import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { ToDoRow } from "../src/features/components/ToDoRow"

const mockOnGetFilteredData = vi.fn();
const mockOnDeleteTodo = vi.fn();
const mockOnUpdateTodo = vi.fn();
const mockOnMarkTodo = vi.fn();
const mockUnmarkTodo = vi.fn();

describe("ToDoRow",()=>{
    it('should render ToDoRow', ()=>{
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
    });
    screen.debug();
})