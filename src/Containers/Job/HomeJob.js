import React from 'react'
import Home from '../../components/Job/Home'
import JobSidebar from '../../components/Job/JobSidebar'
import {HOME_JOB} from '../../asset/js/constant'

function HomeJob(){
    return (
        <>
            <JobSidebar page={HOME_JOB}/>
            <Home/>
        </>
        
    )
}

export default HomeJob;