import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {EXPIRED_TAB} from '../../asset/js/constant'
import Chat from '../../components/Job/Chat/Chat'
import TaskPage from '../../components/Job/JobStatus/TaskPage'



function Expired(){
    return (
        <>
            <JobSidebar page={EXPIRED_TAB}/>
            <TaskPage taskName='DONE' status='EXPIRED' name='Expired'/>
            <Chat/>
        </>
    )
}

export default Expired;