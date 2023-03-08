import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  userList: null,
  userRemoval: false,
  orderList: null,
  orderRemoval: false,
  deliveredFlag: false,
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
    getOrders: (state, { payload }) => {
      state.orderList = payload;
      state.error = null;
      state.loading = false;
    },
    orderDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.orderRemoval = true;
    },

    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = false;
      state.orderRemoval = false;
      state.deliveredFlag = false;
    },
    setDeliveredFlag: (state) => {
      state.deliveredFlag = true;
      state.loading = false;
    },
  },
});

export const {
  clearOrder,
  setError,
  setLoading,
  shippingAddressAdd,
  resetError,
  getUsers,
  userDelete,
  getOrders,
  orderDelete,
  setDeliveredFlag,
} = adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
