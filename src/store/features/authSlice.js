import {createSlice} from '@reduxjs/toolkit';

//sample initial state
/*
initialState = {
    status: false,
    userData: {
        name: "John Doe",
        tokens: {
            "access": ""
            "refresh": ""
        }
    }
}
*/

const initialState = {
    status: false,
    userData: {
        "name": "John Doe",
    },
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state)=>{
            state.status = false;
            state.userData = null;
        },
    }
})


export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
