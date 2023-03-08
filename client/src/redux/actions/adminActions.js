import axios from 'axios';
import {
  getUsers,
  userDelete,
  setError,
  resetError,
  setLoading,
  setDeliveredFlag,
  getOrders,
  orderDelete,
} from '../slices/admin';
import { setProductUpdatedFlag, setProducts } from '../slices/products';

export const getAllUsers = () => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get('/api/users', config);
    dispatch(getUsers(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.messsage
          : error.message
          ? error.message
          : 'Users could not be fetched.'
      )
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    await axios.delete(`/api/users/${id}`, config);
    dispatch(userDelete());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.messsage
          : error.message
          ? error.message
          : 'User could not be removed.'
      )
    );
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get('/api/orders', config);
    dispatch(getOrders(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.messsage
          : error.message
          ? error.message
          : 'Orders could not be fetched.'
      )
    );
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    await axios.delete(`/api/orders/${id}`, config);
    dispatch(orderDelete());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.messsage
          : error.message
          ? error.message
          : 'Order could not be removed.'
      )
    );
  }
};

export const setDelivered = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    await axios.put(`/api/orders/${id}`, {}, config);
    dispatch(setDeliveredFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.messsage
          : error.message
          ? error.message
          : 'Order could not be updated.'
      )
    );
  }
};

export const resetErrorAndRemoval = () => async (dispatch) => {
  dispatch(resetError());
};

export const updateProduct =
  (brand, name, category, stock, price, id, productIsNew, description, image) => async (dispatch, getState) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `/api/products`,
        { brand, name, category, stock, price, id, productIsNew, description, image },
        config
      );

      dispatch(setProducts(data));
      dispatch(setProductUpdatedFlag());
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.messsage
            : error.message
            ? error.message
            : 'Product could not be updated.'
        )
      );
    }
  };

export const deleteProduct = (id) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    await axios.delete(`/api/products/${id}`, config);
    dispatch(resetError());
    dispatch(setProductUpdatedFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.messsage
          : error.message
          ? error.message
          : 'Product could not be removed.'
      )
    );
  }
};

export const uploadProduct = (newProduct) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    await axios.post(`/api/products`, { ...newProduct }, config);

    dispatch(setProductUpdatedFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.messsage
          : error.message
          ? error.message
          : 'Product could not be uploaded.'
      )
    );
  }
};
