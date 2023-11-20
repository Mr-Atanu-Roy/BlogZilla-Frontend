import {createSlice} from '@reduxjs/toolkit';
import {saveToken, getToken, deleteToken} from '../../utils/handelTokens'

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

            // TODO: parse the access token and save the user data

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
