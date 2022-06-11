import React from 'react';
import SummaryTaskChart from '../../components/Chart/SummaryTaskChart';
import { CHART } from '../../asset/js/constant'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
function ChartSummary() {
    return (
        <>
            <JobSidebar page={CHART} />
            <SummaryTaskChart />
        </>

    )
}
export default ChartSummary;


