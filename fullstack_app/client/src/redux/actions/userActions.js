import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  let res =  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
   
 })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser =  (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  let res =  axios
    .put('/putUser', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('sessionToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};


export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};


const setAuthorizationHeader = (token) => {
  const sessionToken = `Bearer ${token}`;
  localStorage.setItem('sessionToken', sessionToken);
  axios.defaults.headers.common['Authorization'] = sessionToken;
};


