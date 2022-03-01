import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { handleLoadAllTasks } from '../../asset/js/callAPI'
import jobsSlice from '../../components/Job/jobsSlice'

function LoadAllTask() {
    const dispatch = useDispatch();
    const isLoaded = useSelector((state) => state.jobs.allTasks);
    if (Object.keys(isLoaded).length===0) {
        handleLoadAllTasks(2)
            .then(result => {
                dispatch(jobsSlice.actions.getAllTasks(result));
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
        </>
    )
}

export default LoadAllTask;