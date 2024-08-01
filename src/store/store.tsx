import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './redusers/peopleReducer.tsx';
import rtkApi from '../API/rtkApi.tsx';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
