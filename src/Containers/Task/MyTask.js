import MyTaskPage from '../../components/Job/Task/MyTaskPage'
import JobSidebar from '../../components/Job/SideBar/JobSidebar'
import { MY_GROUP } from '../../asset/js/constant'
function MyTask() {
    return (
        <>
            <JobSidebar page={MY_GROUP} />
            <MyTaskPage groupDetail={false} owner={true} />
        </>)
}
export default MyTask;
