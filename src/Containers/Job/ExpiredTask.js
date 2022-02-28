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
            <TaskPage taskName='DONE' status='EXPIRED' name='Expired'/>
            <Chat/>
        </>
    )
}

export default Expired;