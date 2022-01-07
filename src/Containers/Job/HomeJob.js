import React from 'react'
import Home from '../../components/Job/Home'
import JobSidebar from '../../components/Job/JobSidebar'
import {HOME_JOB} from '../../asset/js/constant'
import Chat from '../../components/Job/Chat'

function HomeJob(){
    return (
        <>
            <JobSidebar page={HOME_JOB}/>
            <Chat/>
            <Home/>
        </>
        
    )
}

export default HomeJob;