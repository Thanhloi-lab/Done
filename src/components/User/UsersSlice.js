
import {createSlice} from '@reduxjs/toolkit';

export const initUser={
    idUser:0,
    name:'',
    mail:'',
    active:null,
    phone:'',
    token:null,
    address:'',
    gender:'',
    birthDate:'',
    avatar:'',
}

const usersSlice = createSlice({
    name:'users',
    initialState:{
        userInfo:initUser
    },
    reducers:{
        setUser: (state, action) =>{
            state.userInfo = action.payload;
        },
        removeUser:(state, action)=>{
            state.userInfo = initUser;
        }
    }
});

export default usersSlice;