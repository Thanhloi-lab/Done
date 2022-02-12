import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {MY_GROUP} from '../../asset/js/constant'
import CreateGroupPage from '../../components/Job/MyGroup/CreateGroup'



function CreateGroup(){
    return (
        <>
            <JobSidebar page={MY_GROUP}/>
            <CreateGroupPage/>
        </>
    )
}

export default CreateGroup;