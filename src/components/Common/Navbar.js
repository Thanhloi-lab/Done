import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button.js'
import './Navbar.css'
import Avatar from './Avatar';
import { useSelector } from 'react-redux'
import NotificationSideBar from '../Job/Notification/Notification'


function Navbar({setToken,messageStateParam,timeStamp}) {
    console.log('navbar ' , messageStateParam);
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [showNoti, setShowNoti] = useState(false);
    const [messageState, setMessageState] = useState (null);
    const user = useSelector((state) => state.users.userInfo);


    const handleClick = () => {
        setClick(!click);
    }

    const CloseMobileMenu = () => {
        setClick(false);
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }
    const showNotiBar =() => {
        setMessageState(false) ;
        setShowNoti(!showNoti);
    }

    useEffect(() => {
        setMessageState(messageStateParam);
        showButton();
        setShowNoti(showNoti);
    }, [timeStamp])


    window.addEventListener('resize', showButton);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={CloseMobileMenu}>
                    DONE <i className="fab fa-typo3" />
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'} >
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={CloseMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/task" className="nav-links">
                            Task
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={useSelector((state) => state.jobs.path)} className="nav-links" onClick={CloseMobileMenu}>
                            Jobs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sign-in" className="nav-links-mobile" onClick={CloseMobileMenu}>
                            Sign-in
                        </Link>
                    </li>
                    <li className="nav-item">
                       
                        <label  className="nav-links" htmlFor="input-notify" onClick={showNotiBar}>
                        <i className="fa-solid fa-bells"></i>
                            {console.log('messageState ' + messageState)}
                            {  
                                messageState === false ?
                                <i className="fa-solid fa-bell"></i>
                                :
                                <i className="fa-solid fa-bell" style={{color: '#9d261d' }}></i>
                            }
                           
                        </label>
                    </li>
                </ul>
                {user.token && button && <Avatar setToken={setToken} user={user} />}
                {!user.token && button && <Button buttonStyle='btn--outline'>SIGN IN</Button>}
            </div>
            {showNoti === true ? <NotificationSideBar timeStamp={Date.now()}/> : null}
        </nav>
         
    )
}

export default Navbar;