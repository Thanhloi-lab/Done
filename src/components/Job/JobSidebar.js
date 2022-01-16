import React from 'react';
import {Link} from 'react-router-dom';
import {HOME_JOB, UNCOMPLETED_TAB, COMPLETED_TAB, BUG_TAB, GROUPS, MY_GROUP, EXPIRED_TAB} from '../../asset/js/constant'
import './JobSidebar.css'

function JobSidebar(props){
    // const [click, setClick] = useState(false);

    // const handleClick = ()=>{
    //     setClick(!click);
    // }

    // const CloseMobileMenu = ()=>{
    //     setClick(false);
    // }

    // const toggleItem = e =>{
    //     e.preventDefault();
    //     const item = document.getElementById(e.target.getAttribute('href').slice(1));
    //     if(item.classList.contains('show')){
    //         item.classList.remove('show');
    //     }
    //     else{
    //         item.classList.add('show');
    //     }
    // }


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
                        <Link to={HOME_JOB} className="sideBar-link">
                            <i className='fas fa-home'></i>
                            HOME
                        </Link>
                    </li>
                    <li className={props.page === COMPLETED_TAB? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={COMPLETED_TAB} className="sideBar-link">
                            <i className='fas fa-home'></i>
                            COMPLETED
                        </Link>
                    </li>
                    <li className={props.page === UNCOMPLETED_TAB? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={UNCOMPLETED_TAB} className="sideBar-link">
                            <i className='fas fa-home'></i>
                            UNCOMPLETED
                        </Link>
                    </li>
                    <li className={props.page === BUG_TAB? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={BUG_TAB} className="sideBar-link">
                            <i className='fas fa-home'></i>
                            BUG
                        </Link>
                    </li>
                   
                    <li className={props.page === GROUPS? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={GROUPS} className="sideBar-link">
                            <i className='fas fa-home'></i>
                            GROUPS
                        </Link>
                    </li>
                    <li className={props.page === MY_GROUP? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={MY_GROUP} className="sideBar-link">
                            <i className='fas fa-home'></i>
                            MY GROUPS
                        </Link>
                    </li>
                    <li className={props.page === EXPIRED_TAB? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={EXPIRED_TAB} className="sideBar-link">
                            <i className='fas fa-home'></i>
                            EXPIRED
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default JobSidebar;