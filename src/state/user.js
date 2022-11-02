import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


export const sendLoginRequest = createAsyncThunk("LOGIN", (input) => {
  return  axios
            .post(
              "https://okqobo-3001.preview.csb.app/api/user/login",
              input, 
              { withCredentials: true, credentials: 'include'})
            .then((r)=> r.data)
            .catch((err)=> console.log(err))
});

export const sendSignUpRequest = createAsyncThunk("SIGNUP", (input) => {
  return axios
              .post(
                "https://okqobo-3001.preview.csb.app/api/user/register",
                input,
                { withCredentials: true, credentials: 'include' })
              .then((r)=> r.data)
              .catch((err)=> console.log(err))
});

export const sendLogoutRequest = createAsyncThunk("LOGOUT", () => {
  localStorage.removeItem('google')
  document.cookie = "token= "
  return  axios
            .post("https://okqobo-3001.preview.csb.app/api/user/logout", 
            { withCredentials: true, credentials: 'include' })
            .then((r)=> r)
            .catch((err)=> console.log(err))
});

export const setUser = createAsyncThunk("SETUSER", (input) => {
  if(localStorage.getItem('google') === true) input.google = true
  return input;
});

const userReducer = createReducer({}, {
  [sendLoginRequest.fulfilled]: (state, action) => action.payload,
  [sendLogoutRequest.fulfilled]: (state, action) => action.payload,
  [sendSignUpRequest.fulfilled]: (state, action) => action.payload,
  [setUser.fulfilled]: (state, action) => action.payload,
});

export default userReducer;