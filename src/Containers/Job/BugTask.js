import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {BUG_TAB} from '../../asset/js/constant'
import Chat from '../../components/Job/Chat/Chat'
import TaskPage from '../../components/Job/JobStatus/TaskPage'



function BugTask(){
    return (
        <>
            <JobSidebar page={BUG_TAB}/>
            <TaskPage taskName='DONE' status='BUG' name='Bug'/>
            <Chat/>
        </>
    )
}

export default BugTask;