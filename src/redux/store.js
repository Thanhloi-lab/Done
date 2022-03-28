import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from '../components/Job/jobsSlice'
import FilterSlice from '../components/Filters/FilterSlice'


const store = configureStore({
    reducer:{
        jobs:jobsSlice.reducer,
        filters:FilterSlice.reducer
    }
})

export default store;