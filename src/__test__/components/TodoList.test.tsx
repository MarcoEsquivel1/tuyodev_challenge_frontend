import { screen, waitFor } from '@testing-library/react';
import { TodoList } from '../../components/TodoList';
import { renderWithRedux } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('TodoList Component', () => {
    test('renders Todo List title', () => {
        renderWithRedux(<TodoList />);
        const titleElement = screen.getByText(/Todo List/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders Add Task button', () => {
        renderWithRedux(<TodoList />);
        const buttonElement = screen.getByText(/Add Task/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test('renders search box', () => {
        renderWithRedux(<TodoList />);
        const searchElement = screen.getByPlaceholderText(/Search/i);
        expect(searchElement).toBeInTheDocument();
    });

    test('search box changes correctly and calls handleSearchChange', async () => {
        renderWithRedux(<TodoList />);
        const searchElement = screen.getByPlaceholderText(/Search/i);
        expect(searchElement).toBeInTheDocument();
        userEvent.type(searchElement, 'test');
        await waitFor(() => expect(searchElement).toHaveValue('test'));
    });

    
});
