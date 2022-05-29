
import './App.css';
import { useEffect } from 'react';
import Navbar from './components/Common/Navbar';
import { Route, Routes } from 'react-router-dom';
import * as constant from './asset/js/constant';
import usersSlice from './components/User/UsersSlice';
import { useDispatch, useSelector } from 'react-redux';

import Home from './Containers/Home';
import Services from './Containers/Services';
import SignIn from './Containers/User/SignIn';
import SignUp from './Containers/User/SignUp';
import ForgotPassword from './Containers/User/ForgotPassword';
import Footer from './components/Common/Footer'
import Uncompleted from './Containers/Job/UncompletedTask'
import CompletedTask from './Containers/Job/CompletedTask'
import BugTask from './Containers/Job/BugTask'
import HomeJob from './Containers/Job/HomeJob'
import ExpiredTask from './Containers/Job/ExpiredTask'
import Groups from './Containers/Job/Groups'
import MyGroups from './Containers/Job/MyGroups'
import TaskInfo from './Containers/Job/TaskInfo'
import { useState } from 'react'
import { onMessageListener, onSubcribleToTopic } from './firebaseInit'
import { ReactNotificationComponent } from './components/Chat/ReactNotificationComponent'
import Notification from './components/Chat/Notification'
import CreateGroup from './Containers/Job/CreateGroup';
import ErrorPage from './Containers/ErrorPage';
import VerifyEmail from './Containers/User/VerifyUser';
import ChangePassword from './Containers/User/ChangePassword';
import UpdateUserInfo from './Containers/User/UpdateUserInfo';
import Project from './Containers/Job/Project';
import MyProjects from './Containers/Job/MyProjects';

import CreateProject from './Containers/Job/CreateProject';
import GroupDetail from './Containers/Job/GroupDetail';
import UpdateGroup from './Containers/Job/UpdateGroup';



function App() {
    const user = useSelector((state) => state.users);
    const [show, setShow] = useState(false);
    const [token, setToken] = useState(user);

    const dispatch = useDispatch();
    const [notification, setNotification] = useState({ title: "", body: "" });
    onMessageListener()
        .then((payload) => {
            setShow(true);
            setNotification({
                title: payload.notification.title,
                body: payload.notification.body,
            });
            console.log(payload.notification);
        })
        .catch((err) => console.log("failed: ", err));

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token!=='') {
            dispatch(usersSlice.actions.setUser(user));
            setToken(user);
        }
    }, [])

    return (
        <>
            {show ? (<ReactNotificationComponent
                title={notification.title}
                body={notification.body}
            />) : (<></>)}
            <Navbar />
            <Notification />
            <Routes>

                <Route path="/" exact element={< Home />} />
                <Route path="/services" exact element={< Services />} />

                {/* USER */}
                <Route path={constant.SIGN_IN} exact element={< SignIn />} />
                <Route path={constant.SIGN_UP} exact element={< SignUp />} />
                <Route path={constant.FORGOT_PASSWORD} exact element={< ForgotPassword />} />

                {!token.token ? <Route path='*' exact element={< SignIn setToken={setToken}/>} /> : <>

                    <Route path="/verify-email/:email" exact element={< VerifyEmail />} />
                    <Route path="/change-password" exact element={< ChangePassword />} />


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
                </>
                }
            </Routes>
            <Footer />
        </>
    );
}

export default App;
