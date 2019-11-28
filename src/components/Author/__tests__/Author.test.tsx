import React from 'react';
import Author from '..';
import { DataProvider } from '../../../contexts/dataContext';
import { render } from '@testing-library/react';

const profile = {
    id: '3',
    name: "Maryam Tavakkoli",
    image: "/maryam.jpg",
    biography: "My name is..."
  };
test('renders ', async () => {
    const component = render(
        <DataProvider value={{ data: profile }} >
            <Author/>
        </DataProvider>
    );
    expect(component.container).toMatchSnapshot();
});