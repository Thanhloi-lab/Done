import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {GROUPS} from '../../asset/js/constant'
import Home from '../../components/Job/Home'



function Groups(){
    return (
        <>
            <JobSidebar page={GROUPS}/>
            <Home/>
        </>
    )
}

export default Groups;