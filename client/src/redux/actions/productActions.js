import axios from 'axios';

import { setError, setLoading, setProducts, setProduct, productReviewed, resetError } from '../slices/products';

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get('/api/products');
    dispatch(setProducts(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
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

export const createProductReview = (productId, userId, comment, rating, title) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/reviews/${productId}`, { comment, userId, rating, title }, config);

    dispatch(productReviewed());
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

export const resetProductError = () => async (dispatch) => {
  dispatch(resetError());
};
