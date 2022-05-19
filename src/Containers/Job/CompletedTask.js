import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {COMPLETED_TAB} from '../../asset/js/constant'
import TaskPage from '../../components/Job/JobStatus/TaskPage'
import Chat from '../../components/Job/Chat/Chat'
import LoadAllTask from './LoadAllTasks'

function CompletedTask(){
    return (
        <>
            <LoadAllTask/>
            <JobSidebar page={COMPLETED_TAB}/>
            <TaskPage jobStatus='completedJobs' status='completed' title='Completed task'/>
            <Chat/>
        </>
    )
}

export default CompletedTask;





