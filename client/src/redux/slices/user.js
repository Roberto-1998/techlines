import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) ?? null,
  updatedSuccess: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    userLogin: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.error = null;
      state.loading = false;
    },
    updateUserProfile: (state, { payload }) => {
      state.userInfo = payload;
      state.updateSuccess = true;
      state.loading = false;
      state.error = null;
    },
    resetUpdate: (state) => {
      state.updatedSuccess = false;
    },
  },
});

export const { setLoading, setError, userLogin, userLogout, resetUpdate, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
