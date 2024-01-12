import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../taskStore";
import { TaskInterface } from "../../interfaces";

export interface TaskState {
    tasks: TaskInterface[];
}

const initialState: TaskState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskInterface>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        setTaskCompleted: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload) {
                    task.completed = !task.completed;
                }
                return task;
            });
        },
    },
});

export const { addTask, deleteTask, setTaskCompleted } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;
