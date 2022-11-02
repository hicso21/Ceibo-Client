import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getAllPets = createAsyncThunk("ALLPETS", ()=>{
    return axios
                .get(
                    'https://okqobo-3001.preview.csb.app/api/pets/all',
                    { withCredentials: true, credentials: 'include' })
                .then(res=>res.data)
                .catch((err)=> console.log(err))
})

export const search = createAsyncThunk('SEARCH', (input)=>{
    return axios
                .get(
                    `https://okqobo-3001.preview.csb.app/api/pets/search/avanzada?search=${input}`,
                    { withCredentials: true, credentials: 'include' })
                .then(res=>res.data)
                .catch((err)=> console.log(err))
} )

export const searchByGender = createAsyncThunk('SEARCHBYGENDER', (input)=>{
    return axios
                .get(
                    `https://okqobo-3001.preview.csb.app/api/pets/search/genero/${input}`,
                    { withCredentials: true, credentials: 'include' })
                .then(res=>res.data)
                .catch((err)=> console.log(err))
} )

export const searchBySpecie = createAsyncThunk('SEARCHBYSPECIE', (input)=>{
    return axios
                .get(
                    `https://okqobo-3001.preview.csb.app/api/pets/search/specie/${input}`,
                    { withCredentials: true, credentials: 'include' })
                .then(res=>res.data)
                .catch((err)=> console.log(err))
} )

export const searchBySize = createAsyncThunk('SEARCHBYSIZE', (input)=>{
    return axios
                .get(
                    `https://okqobo-3001.preview.csb.app/api/pets/search/size/${input}`,
                    { withCredentials: true, credentials: 'include' })
                .then(res=>res.data)
                .catch((err)=> console.log(err))
} )

const searchReducer = createReducer([], {
    [search.fulfilled]: (state, action) => action.payload,
    [searchByGender.fulfilled]: (state, action) => action.payload,
    [searchBySize.fulfilled]: (state, action) => action.payload,
    [searchBySpecie.fulfilled]: (state, action) => action.payload,
    [getAllPets.fulfilled]: (state, action) => action.payload,
})

export default searchReducer