import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {HOME_JOB, RECENT_JOB} from '../../asset/js/constant'
import './JobSidebar.css'

function JobSidebar(props){
    const [click, setClick] = useState(false);

    const handleClick = ()=>{
        setClick(!click);
    }

    const CloseMobileMenu = ()=>{
        setClick(false);
    }


    

    const toggleItem = e =>{
        e.preventDefault();
        const item = document.getElementById(e.target.getAttribute('href').slice(1));
        if(item.classList.contains('show')){
            item.classList.remove('show');
        }
        else{
            item.classList.add('show');
        }
    }

    return(
        <>
            <input type="checkbox" id="check"/>
            <label htmlFor="check" className="check-label">
                <i className="fas fa-bars" id='btn'></i>
                <i className="fas fa-times" id='cancel'></i>
            </label>
            <div className="sideBar">
                
                <header>Side bar</header>
                <ul className="sideBar-list">
                    <li className={props.page === HOME_JOB? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to="/job" className="sideBar-link">
                            <i className='fas fa-home'></i>
                            HOME
                        </Link>
                    </li>
                    <li className="sideBar-item">
                        <Link to="/job/list" className="sideBar-link">
                            <i className='fas fa-home'></i>
                            LIST JOB
                        </Link>
                    </li>
                    <li className={props.page === RECENT_JOB? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to="/job/recent" className="sideBar-link">
                            <i className='fas fa-home'></i>
                            RECENT
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default JobSidebar;