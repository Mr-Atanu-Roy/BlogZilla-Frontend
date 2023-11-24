import {createSlice} from '@reduxjs/toolkit';
import {saveToken, deleteToken} from '../../utils/handelTokens'

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
        setToken: (state, action)=>{
            //saving token to store if user is logged in-->status=true
            if(state.status){
                state.userData.token = action.payload;
                saveToken(action.payload.refresh)
            }
        },
        login: (state, action)=>{
            //saving token to store
            state.status = true;
            state.userData = {token: action.payload}

            const decode_access = jwtDecode(action.payload.access)

            state.userData.uuid = decode_access.uuid;
            state.userData.name = `${(decode_access.first_name).trim() != '' ? decode_access.first_name : ''} ${(decode_access.last_name).trim() != '' ? decode_access.last_name : ''}`;

            //saving refresh token to local storage
            saveToken(action.payload.refresh)
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


export const {setToken, login, logout} = authSlice.actions;

export default authSlice.reducer;
