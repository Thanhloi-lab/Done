import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {MY_GROUP} from '../../asset/js/constant'
import MyGroup from '../../components/Job/Group/MyGroup'

function MyGroups(){
    return (
        <>
            <JobSidebar page={MY_GROUP}/>
            <MyGroup owner={true}/>
        </>
    )
}

export default MyGroups;