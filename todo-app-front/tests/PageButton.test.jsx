import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { describe, vi } from 'vitest';

import { PageButton } from '../src/features/components/PageButton';

const mockOnGetFilteredData = vi.fn();

describe("PageButton",()=>{

    //Setup mock store
    const initialState = {
        todos:{
            filters: {
                text: "",
                priority: 3,
                state: 2,
            },
            sort:{
                sortByPriority: null,
                sortByDate: null,
            }
        },
        pagination:{
            pagination: {
                total_records: 0,
                total_filtered: 0,
                current_page: 1,
                total_pages:1,
                next_page: -1,
                prev_page: -2
            },
            requestPage: {
                page: 1
            }
        }
    }

    const mockStore = configureStore();
    const store = mockStore(initialState);

    it('renders', ()=>{
        render(
            <Provider store={store}>
                <PageButton
                    onGetFilteredData={mockOnGetFilteredData}
                    pageNum={1}
                />
            </Provider>
        );
    }); //test end

}); //describe end