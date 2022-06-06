import React from 'react';
import JobSidebar from '../../components/Job/SideBar/JobSidebar';
import UpdateProjectPage from '../../components/Job/Project/UpdateProject';
import { MY_PROJECTS } from '../../asset/js/constant';


function UpdateProject() {
    return (
        <>
            <JobSidebar page={MY_PROJECTS} />
            <UpdateProjectPage />
        </>
    )
}

export default UpdateProject;