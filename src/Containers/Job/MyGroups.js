import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {MY_GROUP} from '../../asset/js/constant'
import MyGroup from '../../components/Job/MyGroup/MyGroup'



function MyGroups(){
    return (
        <>
            <JobSidebar page={MY_GROUP}/>
            <MyGroup/>
        </>
    )
}

export default MyGroups;