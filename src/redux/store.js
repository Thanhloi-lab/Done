import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from '../components/Job/jobsSlice'
import FilterSlice from '../components/Filters/FilterSlice'
import usersSlice from '../components/User/UsersSlice';


const store = configureStore({
    reducer:{
        jobs:jobsSlice.reducer,
        filters:FilterSlice.reducer,
        users:usersSlice.reducer
    }
})

export default store;