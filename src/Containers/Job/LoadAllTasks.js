import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import Chat from '../../components/Job/Chat/Chat'
import Task from '../../components/Job/JobStatus/TaskInfo'
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