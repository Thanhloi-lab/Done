import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {MY_GROUP} from '../../asset/js/constant'
import CreateProject from '../../components/Job/Project/CreateProject'


function CreateProjects(){
    return (
        <>
            
            <JobSidebar page={MY_GROUP}/>
            <CreateProject/>
        </>
    )
}

export default CreateProjects;