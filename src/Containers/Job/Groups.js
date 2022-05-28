import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {GROUPS} from '../../asset/js/constant'
import GroupPage from '../../components/Job/Group/MyGroup'

function Groups(){
    return (
        <>
            <JobSidebar page={GROUPS}/>
            <GroupPage owner={false}/>
        </>
    )
}

export default Groups;