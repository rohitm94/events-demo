import { AsyncStorage } from 'react-native';
// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
import api from "../../config/api";
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;


export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (id, pass) => {
  return async dispatch => {

    const response = await fetch(
      api.signupUrl,
      {
        method: "POST",
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: "application/json",
        }),
        body: JSON.stringify({email: id,password: pass})
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      console.log(errorId);
    }

    const resData = await response.json();
    dispatch(
      authenticate(
        resData.email,
        resData.accessToken,
        parseInt(3600) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(3600) * 1000
    );
    saveDataToStorage(resData.id, resData.token, expirationDate);
  };
};

export const login = (id, pass) => {
  return async dispatch => {
    
    const response = await 
    fetch(
      api.loginUrl,
      {
        method: "POST",
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: "application/json",
        }),
        body: JSON.stringify({email: id,password: pass})
      }
    ).then((response) => {
      // console.log('response: ', response);
      return response.json();
    })
    .catch((err) => {
      console.log('error: ', err.message);
  });

    const resData = response;
    dispatch(
      authenticate(
        resData.email,
        resData.accessToken,
        parseInt(3600) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(3600) * 1000
    );
    saveDataToStorage(resData.id, resData.token, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
