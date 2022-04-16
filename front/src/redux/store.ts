import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";
import {notesApi} from "./slices/notes/NotesApi";

export const store = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(notesApi.middleware),
});


setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
