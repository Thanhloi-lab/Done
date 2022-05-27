import React from 'react';
import JobSidebar from '../../components/Job/SideBar/JobSidebar';
import UpdateGroupPage from '../../components/Job/MyGroup/UpdateGroup';
import { MY_GROUP } from '../../asset/js/constant';


function UpdateGroup() {
   

    return (
        <>
            <JobSidebar page={MY_GROUP} />
            <UpdateGroupPage />
        </>
    )
}

export default UpdateGroup;