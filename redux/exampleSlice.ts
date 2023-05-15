import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  at: string;
  lastname: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  at: '',
  lastname: '',
};

const exampleSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser } = exampleSlice.actions;

export default exampleSlice.reducer;
