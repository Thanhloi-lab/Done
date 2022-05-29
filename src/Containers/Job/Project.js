import React from 'react';
import JobSidebar from '../../components/Job/SideBar/JobSidebar';
import {PROJECTS} from '../../asset/js/constant';
import ProjectPage from '../../components/Job/Project/MyProjects';

function Project(){
    return (
        <>
            <JobSidebar page={PROJECTS}/>
            <ProjectPage groupDetail={false} owner={false}/>
        </>
    )
}

export default Project;