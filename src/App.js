import './App.css';
import Navbar from './components/Common/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Containers/Home'
import Jobs from './Containers/Jobs'
import Services from './Containers/Services'
import SignIn from './Containers/User/SignIn'
import SignUp from './Containers/User/SignUp'
import ForgotPassword from './Containers/User/ForgotPassword';


function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={< Home />}/>
                    <Route path="/Jobs" exact element={< Jobs />}/>
                    <Route path="/services" exact element={< Services />}/>
                    <Route path="/sign-in" exact element={< SignIn />}/>
                    <Route path="/sign-up" exact element={< SignUp />}/>
                    <Route path="/forgot-password" exact element={< ForgotPassword />}/>

                </Routes>
            </Router>
        </>
    );
}

export default App;
