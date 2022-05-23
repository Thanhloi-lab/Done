import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {PROJECTS} from '../../asset/js/constant'
import ProjectPage from '../../components/Job/Project/Projects'

function Project(){
    return (
        <>
            <JobSidebar page={PROJECTS}/>
            <ProjectPage/>
        </>
    )
}

export default Project;