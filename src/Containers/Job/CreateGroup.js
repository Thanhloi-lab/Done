import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {MY_GROUP} from '../../asset/js/constant'
import CreateGroupPage from '../../components/Job/Group/CreateGroup'
import { useParams } from 'react-router-dom'

function CreateGroup(){
    return (
        <>
            <JobSidebar page={MY_GROUP}/>
            <CreateGroupPage/>
        </>
    )
}

export default CreateGroup;