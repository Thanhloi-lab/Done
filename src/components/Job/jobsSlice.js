
import {createSlice} from '@reduxjs/toolkit';
import {HOME_JOB} from '../../asset/js/constant'

const jobsSlice = createSlice({
    name:'jobs',
    initialState:{
        path:HOME_JOB
    },
    reducers:{
        changeTab: (state, action) =>{
            state.path = action.payload;
        }
    }
});

export default jobsSlice;