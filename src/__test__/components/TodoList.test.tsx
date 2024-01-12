import { render, screen } from '@testing-library/react';
import { TodoList } from '../../components/TodoList';
import { renderWithRedux } from '../../utils/test-utils';
import '@testing-library/jest-dom'

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
});
