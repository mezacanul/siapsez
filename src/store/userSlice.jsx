import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { 
      info: null, 
      isAuthenticated: false 
    },
    reducers: {
      setUserInfo: (state, action) => {
        state.info = action.payload;
        state.isAuthenticated = true;
      },
      clearUserInfo: (state) => {
        state.info = null;
        state.isAuthenticated = false;
      },
    },
  });

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
