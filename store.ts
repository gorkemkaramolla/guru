import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './redux/exampleSlice';

const store = configureStore({
  reducer: {
    user: exampleReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
