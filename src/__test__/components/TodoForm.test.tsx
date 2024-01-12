import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from '../../components/TodoForm';
import { renderWithRedux } from '../../utils/test-utils';
import '@testing-library/jest-dom';

describe('TodoForm Component', () => {
    test('renders Add Task modal', () => {
        renderWithRedux(<TodoForm showModal={true} toggleModal={() => {}} />);
        const modalTitle = screen.getByText(/Add Task/i);
        expect(modalTitle).toBeInTheDocument();
    });

    test('renders form elements', () => {
        renderWithRedux(<TodoForm showModal={true} toggleModal={() => {}} />);
        const descriptionInput = screen.getByLabelText(/Task description/i);
        const dateInput = screen.getByLabelText(/Task Date/i);
        const submitButton = screen.getByText(/Submit/i);

        expect(descriptionInput).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('calls toggleModal on close button click', async () => {
        const toggleModal = jest.fn();
        renderWithRedux(<TodoForm showModal={true} toggleModal={toggleModal} />);
        const closeButton = screen.getByRole('button', { name: 'Close' });
        userEvent.click(closeButton);
        await waitFor(() => expect(toggleModal).toHaveBeenCalledTimes(1));
    });

    test('calls 1 time toggleModal on submit button click', async () => {
        const toggleModal = jest.fn();
        renderWithRedux(<TodoForm showModal={true} toggleModal={toggleModal} />);
        const descriptionInput = screen.getByPlaceholderText(/Some description/i);
        const dateInput = screen.getByPlaceholderText(/Enter Todo/i);

        userEvent.type(descriptionInput, 'test');
        await waitFor(() => expect(descriptionInput).toHaveValue('test'));
        userEvent.type(dateInput, '2021-10-10');
        await waitFor(() => expect(dateInput).toHaveValue('2021-10-10'));

        const submitButton = screen.getByText(/Submit/i);
        userEvent.click(submitButton);
        await waitFor(() => expect(toggleModal).toHaveBeenCalledTimes(1));
    });

    test('calls 0 times toggleModal on submit button click with empty fields', async () => {
        const toggleModal = jest.fn();
        renderWithRedux(<TodoForm showModal={true} toggleModal={toggleModal} />);
        const submitButton = screen.getByText(/Submit/i);
        userEvent.click(submitButton);
        await waitFor(() => expect(toggleModal).toHaveBeenCalledTimes(0));
    });

    test('show toast when submit button is clicked with empty fields', async () => {
        const toggleModal = jest.fn();
        renderWithRedux(<TodoForm showModal={true} toggleModal={toggleModal} />);
        const submitButton = screen.getByText(/Submit/i);
        userEvent.click(submitButton);
        await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
        
    });
});



