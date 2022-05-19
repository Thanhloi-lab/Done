import {createSlice} from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name:'filters',
    initialState:{
        search:'',
        status:'All'
    },
    reducers:{
        filtersTextChange: (state, action) =>{
            state.search = action.payload;
        },
        statusFiltersChange:(state, action) =>{
            state.status = action.payload;
        }
    }
});

export default filtersSlice;