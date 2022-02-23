import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {GROUPS} from '../../asset/js/constant'
import GroupPage from '../../components/Job/Group/Group'



function Groups(){
    return (
        <>
            <JobSidebar page={GROUPS}/>
            <GroupPage/>
        </>
    )
}

export default Groups;