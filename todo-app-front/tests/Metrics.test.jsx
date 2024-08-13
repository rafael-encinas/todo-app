import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import { Provider } from 'react-redux'
//import { store } from "../src/app/store.js"
import configureStore from 'redux-mock-store';
//import todosReducer from "../src/features/todos/todos.js"
import paginationReducer from "../src/features/pagination/paginationSlice.js"

import { Metrics } from '../src/features/components/Metrics.jsx';
import { describe, expect } from 'vitest';

const mockStore = configureStore([]);

describe("Metrics", ()=>{

    const initialState = {
        todos:{
            metrics: {
                overallAverage: "01:23",
                lowPriorityAverage: "04:56",
                medPriorityAverage: "07:08",
                highPriorityAverage: "09:10",
            }
        }
    }
    const mockStore = configureStore();
    const store = mockStore(initialState);

    it('renders', ()=>{
        render(
            <Provider store={store}>
                <Metrics />
            </Provider>
        );
    }) //test end

    it('should assign "01:23 to "overallAverage"', ()=>{
        render(
            <Provider store={store}>
                <Metrics />
            </Provider>
        );
        const overallAverageElement = screen.getByTestId("allAvg-test");
        expect(overallAverageElement).toBeInTheDocument();
        expect(overallAverageElement.textContent).toBe("01:23 minutes");
    }) //test 
    
    it('should assign "04:56 to "lowPriorityAverage"', ()=>{
        render(
            <Provider store={store}>
                <Metrics />
            </Provider>
        );
        const lowAverageElement = screen.getByTestId("lowAvg-test");
        expect(lowAverageElement).toBeInTheDocument();
        expect(lowAverageElement.textContent).toBe("04:56 minutes");
    }) //test end

    it('should assign "07:08 to "medPriorityAverage"', ()=>{
        render(
            <Provider store={store}>
                <Metrics />
            </Provider>
        );
        const medAverageElement = screen.getByTestId("medAvg-test");
        expect(medAverageElement).toBeInTheDocument();
        expect(medAverageElement.textContent).toBe("07:08 minutes");
    }) //test end

    it('should assign "09:10 to "highPriorityAverage"', ()=>{
        render(
            <Provider store={store}>
                <Metrics />
            </Provider>
        );
        const highAverageElement = screen.getByTestId("highAvg-test");
        expect(highAverageElement).toBeInTheDocument();
        expect(highAverageElement.textContent).toBe("09:10 minutes");
    }) //test end

}); //describe end