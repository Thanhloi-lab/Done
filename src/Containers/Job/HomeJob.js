import React from 'react'
import Home from '../../components/Job/Home'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import {HOME_JOB} from '../../asset/js/constant'
import {Route, Routes } from 'react-router-dom'
import Chat from '../../components/Job/Chat/Chat'


function HomeJob(){
    return (
        <>
            <JobSidebar page={HOME_JOB}/>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
            </Routes>
        </>
        
    )
}

export default HomeJob;