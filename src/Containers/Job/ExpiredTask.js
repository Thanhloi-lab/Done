import React from 'react'
import Home from '../../components/Job/Home'
import JobSidebar from '../../components/Job/JobSidebar'
import {EXPIRED_TAB} from '../../asset/js/constant'
import Chat from '../../components/Job/Chat'

function Expired(){
    return (
        <>
            <JobSidebar page={EXPIRED_TAB}/>
            <Home/>
            <Chat/>
        </>
    )
}

export default Expired;