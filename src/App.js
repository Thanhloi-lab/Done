
import './App.css';
import Navbar from './components/Common/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Containers/Home'
import Services from './Containers/Services'
import SignIn from './Containers/User/SignIn'
import SignUp from './Containers/User/SignUp'
import ForgotPassword from './Containers/User/ForgotPassword';
import Job from './Containers/Job/Job'
import Footer from './components/Common/Footer'
import RecentJobs from './Containers/Job/RecentJobs'
import HomeJob from './Containers/Job/HomeJob'


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
                <Route path="/job" exact element={<HomeJob/>}/>
                <Route path="/job/recent" exact element={<RecentJobs/>}/>
                <Route path="/job/list" exact element={<Job/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
