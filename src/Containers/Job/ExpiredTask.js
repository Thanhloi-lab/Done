import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {EXPIRED_TAB} from '../../asset/js/constant'
import Chat from '../../components/Job/Chat/Chat'
import TaskPage from '../../components/Job/JobStatus/TaskPage'
import LoadAllTask from './LoadAllTasks'

function Expired(){
    return (
        <>
            <LoadAllTask/>
            <JobSidebar page={EXPIRED_TAB}/>
            <TaskPage jobStatus='expiredJobs' status='expired' title='Expired task'/>
            <Chat/>
        </>
    )
}

export default Expired;