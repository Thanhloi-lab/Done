import React from 'react'
import JobList from '../../components/Job/JobList'
import JobSidebar from '../../components/Job/JobSidebar'
import {HOME_JOB} from '../../asset/js/constant'



function Job(){
    return (
        <>
            <JobSidebar page={HOME_JOB}/>
            <JobList/>
        </>
    )
}

export default Job;