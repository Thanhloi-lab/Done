import React from 'react'
import JobSidebar from '../../components/Job/JobSidebar'
import {BUG_TAB} from '../../asset/js/constant'
import Home from '../../components/Job/Home'
import Chat from '../../components/Job/Chat'


function BugTask(){
    return (
        <>
            <JobSidebar page={BUG_TAB}/>
            <Home/>
            <Chat/>
        </>
    )
}

export default BugTask;