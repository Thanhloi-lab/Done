import React from 'react'
import JobSidebar from '../../components/Job/JobSidebar'
import {COMPLETED_TAB} from '../../asset/js/constant'
import Home from '../../components/Job/Home'
import Chat from '../../components/Job/Chat'

function CompletedTask(){
    return (
        <>
            <JobSidebar page={COMPLETED_TAB}/>
            <Home/>
            <Chat/>
        </>
    )
}

export default CompletedTask;





