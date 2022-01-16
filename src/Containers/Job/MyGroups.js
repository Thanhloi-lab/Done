import React from 'react'
import JobSidebar from '../../components/Job/JobSidebar'
import {MY_GROUP} from '../../asset/js/constant'
import Home from '../../components/Job/Home'



function MyGroups(){
    return (
        <>
            <JobSidebar page={MY_GROUP}/>
            <Home/>
        </>
    )
}

export default MyGroups;