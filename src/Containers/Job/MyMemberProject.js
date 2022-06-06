import React from 'react'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import { GROUPS } from '../../asset/js/constant'
import MemberProject from '../../components/Job/Project/MemberProject'

function MyMemberProject() {
    return (
        <>
            <JobSidebar page={GROUPS} />
            <MemberProject groupDetail={false} owner={true} />
        </>
    )
}

export default MyMemberProject;