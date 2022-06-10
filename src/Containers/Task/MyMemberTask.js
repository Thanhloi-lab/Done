import MemberTask from '../../components/Job/Task/MemberTask'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import { PROJECTS } from '../../asset/js/constant'
function MyMemberTask() {
    return (
        <>
            <JobSidebar page={PROJECTS} />
            <MemberTask groupDetail={false} owner={true} />
        </>)
}
export default MyMemberTask;
