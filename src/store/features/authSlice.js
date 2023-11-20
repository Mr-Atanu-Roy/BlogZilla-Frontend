import {createSlice} from '@reduxjs/toolkit';
import {saveToken, getToken, deleteToken} from '../../utils/handelTokens'

import { jwtDecode } from "jwt-decode"

//sample initial state
/*
initialState = {
    status: false,
    userData: {
        uuid: "sdfsd-sdfsd-awe87sdfsd"
        name: "John Doe",
        token: {
            "refresh": ""
            "access": ""
        }
    }
}
*/

const initialState = {
    status: false,
    userData: null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            //saving token to store
            state.status = true;
            state.userData = {token: action.payload}

            const decode_access = jwtDecode(action.payload.access)

            state.userData.uuid = decode_access.uuid;
            state.userData.name = `${(decode_access.first_name).trim() != '' ? decode_access.first_name : ''} ${(decode_access.last_name).trim() != '' ? decode_access.last_name : ''}`;

            //saving token to local storage
            saveToken(action.payload)
        },
        logout: (state)=>{
            //deleting token from store
            state.status = false;
            state.userData = null;
            
            //deleting token from local storage
            deleteToken()
        },
    }
})


export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
