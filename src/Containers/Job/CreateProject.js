import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {MY_PROJECTS} from '../../asset/js/constant'
import CreateProject from '../../components/Job/Project/CreateProject'


function CreateProjects(){
    return (
        <>
            
            <JobSidebar page={MY_PROJECTS}/>
            <CreateProject/>
        </>
    )
}

export default CreateProjects;