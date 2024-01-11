import { configureStore, Store } from '@reduxjs/toolkit';
import  taskReducer from './slices/taskSlice'; // Fix the import statement
import { useDispatch } from 'react-redux';

export interface RootState {
    tasks: ReturnType<typeof taskReducer>
}

export const store: Store<RootState> = configureStore({
    reducer: {
        tasks: taskReducer
    }
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store