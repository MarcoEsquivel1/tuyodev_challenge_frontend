import { configureStore, Store } from '@reduxjs/toolkit';
import  taskReducer from './slices/taskSlice';
import { useDispatch } from 'react-redux';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

export interface RootState {
    tasks: ReturnType<typeof taskReducer>
}

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  tasks: taskReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store: Store<RootState> = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store