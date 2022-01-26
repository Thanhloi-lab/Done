import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {COMPLETED_TAB} from '../../asset/js/constant'
import TaskPage from '../../components/Job/JobStatus/TaskPage'
import Chat from '../../components/Job/Chat/Chat'

function CompletedTask(){
    return (
        <>
            <JobSidebar page={COMPLETED_TAB}/>
            <TaskPage status='COMPLETED' name='Completed'/>
            <Chat/>
        </>
    )
}

export default CompletedTask;





