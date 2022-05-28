import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {MY_PROJECTS} from '../../asset/js/constant'
import MyProject from '../../components/Job/Project/MyProjects'

function MyProjects(){
    return (
        <>
            <JobSidebar page={MY_PROJECTS}/>
            <MyProject groupDetail={false} owner={true}/>
        </>
    )
}

export default MyProjects;