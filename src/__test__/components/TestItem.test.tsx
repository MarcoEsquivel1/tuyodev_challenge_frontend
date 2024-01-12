import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from '../../components/TodoItem';
import { renderWithRedux } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { TaskInterface } from '../../interfaces';
import { useAppDispatch } from '../../stores/taskStore';
import { setTaskCompleted, deleteTask } from '../../stores/slices/taskSlice';

jest.mock('../../stores/taskStore', () => ({
    ...jest.requireActual('../../stores/taskStore'),
    useAppDispatch: jest.fn(),
}));


describe('TodoItem Component', () => {
    const mockTask: TaskInterface = {
        id: '1',
        description: 'Test Task',
        date: '2022-01-15',
        completed: false,
    };

    const mockTaskCompleted: TaskInterface = {
        id: '1',
        description: 'Test Task',
        date: '2022-01-15',
        completed: true,
    };

    test('renders TodoItem with task details', () => {
        renderWithRedux(<TodoItem task={mockTask} />);
        const taskDescription = screen.getByText(/Test Task/i);
        const taskDate = screen.getByText(/2022-01-15/i);
        expect(taskDescription).toBeInTheDocument();
        expect(taskDate).toBeInTheDocument();
    });

    test('the buttons exists', () => {
        renderWithRedux(<TodoItem task={mockTask} />);
        const completeButton = screen.getByLabelText(/Complete Task/i);
        const deleteButton = screen.getByLabelText(/Delete Task/i);
        expect(completeButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    test('color of complete button is red', () => {
        renderWithRedux(<TodoItem task={mockTask} />);
        const completeButton = screen.getByLabelText(/Complete Task/i);
        expect(completeButton).toHaveClass('btn-danger');
    });

    test('color of complete button is green', () => {
        renderWithRedux(<TodoItem task={mockTaskCompleted} />);
        const completeButton = screen.getByLabelText(/Complete Task/i);
        expect(completeButton).toHaveClass('btn-success');
    });

    test('on click complete button, dispatch is called', async () => {
        const dispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        renderWithRedux(<TodoItem task={mockTask} />);
        const completeButton = screen.getByLabelText(/Complete Task/i);
        userEvent.click(completeButton);
        await waitFor(() => expect(dispatch).toHaveBeenCalledTimes(1));
    });

    test('on click complete button, dispatch is called with correct parameters', async () => {
        const dispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        renderWithRedux(<TodoItem task={mockTask} />);
        const completeButton = screen.getByLabelText(/Complete Task/i);
        userEvent.click(completeButton);
        await waitFor(() => expect(dispatch).toHaveBeenCalledWith(setTaskCompleted('1')));
    });

    test('on click delete button, dispatch is called', async () => {
        const dispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        renderWithRedux(<TodoItem task={mockTask} />);
        const deleteButton = screen.getByLabelText(/Delete Task/i);
        userEvent.click(deleteButton);
        await waitFor(() => expect(dispatch).toHaveBeenCalledTimes(1));
    });

    test('on click delete button, dispatch is called with correct parameters', async () => {
        const dispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        renderWithRedux(<TodoItem task={mockTask} />);
        const deleteButton = screen.getByLabelText(/Delete Task/i);
        userEvent.click(deleteButton);
        await waitFor(() => expect(dispatch).toHaveBeenCalledWith(deleteTask('1')));
    });

    test('on click complete button, task is completed', async () => {
        const dispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        renderWithRedux(<TodoItem task={mockTask} />);
        const completeButton = screen.getByLabelText(/Complete Task/i);
        userEvent.click(completeButton);
        await waitFor(() => expect(dispatch).toHaveBeenCalledWith(setTaskCompleted('1')));
    });
});