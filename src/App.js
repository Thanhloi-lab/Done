
import './App.css';
import Navbar from './components/Common/Navbar';
import {Route, Routes } from 'react-router-dom';
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
import {HOME_JOB, UNCOMPLETED_TAB, COMPLETED_TAB, BUG_TAB, EXPIRED_TAB, GROUPS, MY_GROUP} from './asset/js/constant';
import TaskInfo from './Containers/Job/TaskInfo';
import ErrorPage from './Containers/ErrorPage';
import CreateGroup from './Containers/Job/CreateGroup';


function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" exact element={< Home />}/>
                <Route path="/services" exact element={< Services />}/>
                <Route path="/sign-in" exact element={< SignIn />}/>
                <Route path="/sign-up" exact element={< SignUp />}/>
                <Route path="/forgot-password" exact element={< ForgotPassword />}/>

                <Route path="/job/create-group" exact element={< CreateGroup />}/>

                {/* Task tab */}
                <Route path={COMPLETED_TAB} exact element={<CompletedTask/>}/>
                <Route path={UNCOMPLETED_TAB} exact element={<Uncompleted/>}/>
                <Route path={BUG_TAB} exact element={<BugTask/>}/>
                <Route path={EXPIRED_TAB} exact element={<ExpiredTask/>}/>
                <Route path={GROUPS} exact element={<Groups/>}/>
                <Route path={MY_GROUP} exact element={<MyGroups/>}/>
                <Route path={HOME_JOB +"/*"} exact element={<HomeJob/>}/>

                {/* task detail */}
                <Route path="/job/:id" exact element={<TaskInfo/>}/>
                <Route path='/*' element={<ErrorPage/>}/>

            </Routes>
            <Footer/>
        </>
    );
}

export default App;
