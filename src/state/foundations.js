import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllFoundations = createAsyncThunk("FOUNDATIONS_ALL", ()=>{
    return axios
                .get(
                    'https://okqobo-3001.preview.csb.app/api/foundation',
                    { withCredentials: true, credentials: 'include' })
                .then((foundations)=>foundations.data)
                .catch((err)=> console.log(err))
})

export const getFoundation = createAsyncThunk("FOUNDATIONS", (input)=>{
    return axios
                .get(
                    `https://okqobo-3001.preview.csb.app/api/foundation/${input}`,
                    { withCredentials: true, credentials: 'include' })
                .then((foundations)=>[foundations.data])
                .catch((err)=> console.log(err))
})


const foundationsReducer = createReducer([],{
    [getAllFoundations.fulfilled]: (state, action) => action.payload,
    [getFoundation.fulfilled]: (state, action) => action.payload,
})

export default foundationsReducer;