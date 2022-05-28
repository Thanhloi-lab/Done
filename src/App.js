
import './App.css';
import Navbar from './components/Common/Navbar';
import { Route, Routes } from 'react-router-dom';
import * as constant from './asset/js/constant';

import Home from './Containers/Home';
import Services from './Containers/Services';
import SignIn from './Containers/User/SignIn';
import SignUp from './Containers/User/SignUp';
import ForgotPassword from './Containers/User/ForgotPassword';
import Footer from './components/Common/Footer';
import Uncompleted from './Containers/Job/UncompletedTask';
import CompletedTask from './Containers/Job/CompletedTask';
import BugTask from './Containers/Job/BugTask';
import HomeJob from './Containers/Job/HomeJob';
import ExpiredTask from './Containers/Job/ExpiredTask';
import Groups from './Containers/Job/Groups';
import MyGroups from './Containers/Job/MyGroups';
import Project from './Containers/Job/Project';
import MyProjects from './Containers/Job/MyProjects';

import TaskInfo from './Containers/Job/TaskInfo';
import ErrorPage from './Containers/ErrorPage';
import UpdateGroup from './Containers/Job/UpdateGroup';
import CreateGroup from './Containers/Job/CreateGroup';
import CreateProject from './Containers/Job/CreateProject';
import GroupDetail from './Containers/Job/GroupDetail';


function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" exact element={< Home />} />
                <Route path="/services" exact element={< Services />} />

                {/* USER */}
                <Route path={constant.SIGN_IN} exact element={< SignIn />} />
                <Route path={constant.SIGN_UP} exact element={< SignUp />} />
                <Route path={constant.FORGOT_PASSWORD} exact element={< ForgotPassword />} />

                {/* GROUPs */}
                <Route path={constant.CREATE_GROUP} exact element={< CreateGroup />} />
                <Route path={constant.UPDATE_GROUP} exact element={< UpdateGroup />} />
                <Route path={constant.GROUPS} exact element={<Groups />} />
                <Route path={constant.MY_GROUP} exact element={<MyGroups />} />
                <Route path={constant.GROUP_DETAIL} exact element={<GroupDetail />} />

                {/* projects */}
                <Route path={constant.CREATE_PROJECTS} exact element={< CreateProject />} />
                <Route path={constant.UPDATE_PROJECTS} exact element={< CreateProject />} />
                <Route path={constant.PROJECTS} exact element={<Project />} />
                <Route path={constant.MY_PROJECTS} exact element={<MyProjects />} />

                {/* Task */}
                <Route path={constant.HOME_JOB} exact element={<HomeJob />} />
                <Route path={constant.COMPLETED_TAB} exact element={<CompletedTask />} />
                <Route path={constant.UNCOMPLETED_TAB} exact element={<Uncompleted />} />
                <Route path={constant.BUG_TAB} exact element={<BugTask />} />
                <Route path={constant.EXPIRED_TAB} exact element={<ExpiredTask />} />
                <Route path={constant.TASK_DETAIL} exact element={<TaskInfo />} />

                {/* error */}
                <Route path='*' element={<ErrorPage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
