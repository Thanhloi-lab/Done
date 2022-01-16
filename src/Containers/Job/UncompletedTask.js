import React from 'react'
import Home from '../../components/Job/Home'
import JobSidebar from '../../components/Job/JobSidebar'
import {UNCOMPLETED_TAB} from '../../asset/js/constant'
import Chat from '../../components/Job/Chat'


function Uncompleted(){
    return (
        <>
            <JobSidebar page={UNCOMPLETED_TAB}/>
            <Home/>
            <Chat/>
        </>
    )
}

export default Uncompleted;