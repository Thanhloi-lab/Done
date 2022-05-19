import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {UNCOMPLETED_TAB} from '../../asset/js/constant'
import Chat from '../../components/Job/Chat/Chat'
import TaskPage from '../../components/Job/JobStatus/TaskPage'
import LoadAllTask from './LoadAllTasks'


function Uncompleted(){
    return (
        <>
            <LoadAllTask/>
            <JobSidebar page={UNCOMPLETED_TAB}/>
            <TaskPage jobStatus='unCompletedJobs' status='unCompleted' title='Uncompleted task'/>
            <Chat/>
        </>
    )
}

export default Uncompleted;