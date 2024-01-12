import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { RootState } from '../stores/taskStore';
import taskReducer from '../stores/slices/taskSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = combineReducers({
  tasks: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const mockStore: Store<RootState> = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: Store<RootState>;
}

export function renderWithRedux(
  ui: React.ReactElement,
  { preloadedState = {}, store = mockStore, ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
