import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar';
import {MY_GROUP} from '../../asset/js/constant';
import ProjectPage from '../../components/Job/Project/MyProjects';


function GroupDetail(){
    return (
        <>
            <JobSidebar page={MY_GROUP}/>
            <ProjectPage groupDetail={true} owner={true}/>
        </>
    )
}

export default GroupDetail;