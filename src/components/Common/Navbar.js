import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from './Button.js'
import './Navbar.css'

function Navbar(){
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = ()=>{
        setClick(!click);
    }

    const CloseMobileMenu = ()=>{
        setClick(false);
    }

    const showButton = ()=>{
        if(window.innerWidth <=960){
            setButton(false);
        }else{
            setButton(true);
        }
    }

    useEffect(()=>{
        showButton();
    }, [])


    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={CloseMobileMenu}>
                        DONE <i className="fab fa-typo3"/>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'} >
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={CloseMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className="nav-links" onClick={CloseMobileMenu}>
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/jobs" className="nav-links" onClick={CloseMobileMenu}>
                                Jobs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sign-in" className="nav-links-mobile" onClick={CloseMobileMenu}>
                                Sign-in
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline'>SIGN IN</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar;