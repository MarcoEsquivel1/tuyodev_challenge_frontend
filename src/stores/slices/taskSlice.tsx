import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../taskStore";
import { TaskInterface } from "../../interfaces";

export interface TaskState {
    tasks: TaskInterface[]
    addTask: (task: TaskInterface) => void
    deleteTask: (id: string) => void
}

const initialState: TaskState = {
    tasks: [],
    addTask: () => {},
    deleteTask: () => {}
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskInterface>) => {
            state.tasks.push(action.payload)

        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
    }
})

export const { addTask, deleteTask } = taskSlice.actions

export const selectTasks = (state: RootState) => state.tasks

export default taskSlice.reducer