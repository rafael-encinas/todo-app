import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';



import { NewToDoBtn } from '../src/features/components/NewToDoBtn.jsx';
import { expect, vi } from 'vitest';

const mockToggleModal = vi.fn();

describe('NewToDoBtn', () => {
  it('renders', () => {
    render(
        <NewToDoBtn />    
    );
    });
    screen.debug();

    it('render "+ New To Do" text',()=>{
        render(<NewToDoBtn />)
        screen.getByText('+ New To Do');
    })
    //Solo se hace si el texto de adentro del boton cambia
    screen.debug();

    it('should fire toggleModal function when user clicks it', ()=>{
        render(
        <NewToDoBtn
            toggleModal={mockToggleModal}
        />)
        fireEvent.click(screen.getByText('+ New To Do'))
        expect(mockToggleModal).toBeCalled();
    })
});