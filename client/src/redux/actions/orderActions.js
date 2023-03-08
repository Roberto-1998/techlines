import axios from 'axios';
import { shippingAddressAdd, setError, clearOrder } from '../slices/order.js';

export const setShippingAddress = (data) => (dispatch) => {
  dispatch(shippingAddressAdd(data));
};

export const setShippingAddressError = (value) => (dispatch) => {
  dispatch(setError(value));
};

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    order: { shippingAddress },
    user: { userInfo },
  } = getState();

  const prepareOrder = { ...order, shippingAddress };

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    await axios.post('/api/orders', prepareOrder, config);
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.messsage
          : error.message
          ? error.message
          : 'An unexpected error has occured. Pleasy try again later.'
      )
    );
  }
};

export const resetOrder = () => async (dispatch) => {
  dispatch(clearOrder());
};
