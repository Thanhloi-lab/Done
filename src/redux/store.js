import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from '../components/Job/jobsSlice'

const store = configureStore({
    reducer:{
        jobs:jobsSlice.reducer,
    }
})

export default store;