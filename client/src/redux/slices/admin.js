import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  userList: null,
  userRemoval: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    getUsers: (state, { payload }) => {
      state.userList = payload;
      state.error = null;
      state.loading = false;
    },
    userDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = true;
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = false;
    },
  },
});

export const { clearOrder, setError, setLoading, shippingAddressAdd, resetError, getUsers, userDelete } =
  adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
