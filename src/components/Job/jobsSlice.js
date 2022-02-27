
import {createSlice} from '@reduxjs/toolkit';
import {HOME_JOB} from '../../asset/js/constant'

const jobsSlice = createSlice({
    name:'jobs',
    initialState:{
        path:HOME_JOB,
        allTasks:{}
    },
    reducers:{
        changeTab: (state, action) =>{
            state.path = action.payload.path;
        },
        getAllTasks:(state, action)=>{
            state.allTasks = action.payload.allTasks
        }
    }
});

export default jobsSlice;