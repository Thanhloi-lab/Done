import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import Chat from '../../components/Job/Chat/Chat'
import Task from '../../components/Job/JobStatus/TaskInfo'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { handleLoadAllTasks } from '../../asset/js/API/callAPI'
import jobsSlice from '../../components/Job/jobsSlice'

function TaskInfo() {
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
    const jobs = Object.values(useSelector((state) => state.jobs.allTasks));
    // getArrayTaskFromObject(jobs, useParams().id);x
    let id = useParams().id;
    let jobDetail = jobs.find(x=>x.idTask+"" === id+"");

    return (
        <>
            <JobSidebar page={useSelector((state) => state.jobs.path)} />
            <Task detail={jobDetail} taskId={useParams().id}/>
            <Chat />
        </>
    )
}

export default TaskInfo;