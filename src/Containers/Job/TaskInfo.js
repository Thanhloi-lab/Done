import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import Chat from '../../components/Job/Chat/Chat'
import Task from '../../components/Job/JobStatus/TaskInfo'
import {useSelector} from 'react-redux';

function TaskInfo(){

    return (
        <>
            <JobSidebar page={useSelector((state) => state.jobs.path)}/>
            <Task taskName='DONE' status='EXPIRED' name='Expired'/>
            <Chat/>
        </>
    )
}

export default TaskInfo;