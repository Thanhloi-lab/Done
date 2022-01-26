import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {HOME_JOB, UNCOMPLETED_TAB, COMPLETED_TAB, BUG_TAB, GROUPS, MY_GROUP, EXPIRED_TAB, STATUS} from '../../../asset/js/constant'
import './JobSidebar.css'
import jobsSlice from '../jobsSlice'


function JobSidebar(props){
    console.log('Sidebar rendered');
    const dispatch = useDispatch();

    useEffect(()=>{
        const state = {
            path: props.page,
        }
        dispatch(jobsSlice.actions.changeTab(state))
    }, [])

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
                    <li className={props.page === HOME_JOB ? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={HOME_JOB} className="sideBar-link">
                            <i className='fas fa-home sidebar_icon'></i>
                            HOME
                        </Link>
                    </li>
                    <li className={props.page === COMPLETED_TAB ? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={COMPLETED_TAB} className="sideBar-link">
                            <i className="fas fa-check sidebar_icon"></i>
                            COMPLETED
                        </Link>
                    </li>
                    <li className={props.page === UNCOMPLETED_TAB? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={UNCOMPLETED_TAB} className="sideBar-link">
                            <i className="fas fa-times sidebar_icon"></i>
                            UNCOMPLETED
                        </Link>
                    </li>
                    <li className={props.page === BUG_TAB? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={BUG_TAB} className="sideBar-link">
                            <i className="fas fa-bug sidebar_icon"></i>
                            BUG
                        </Link>
                    </li>
                    <li className={props.page === EXPIRED_TAB? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={EXPIRED_TAB} className="sideBar-link">
                            <i className="fas fa-calendar-times sidebar_icon"></i>
                            EXPIRED
                        </Link>
                    </li>
                    <li className={props.page === GROUPS? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={GROUPS} className="sideBar-link">
                            <i className="fas fa-users sidebar_icon"></i>
                            GROUPS
                        </Link>
                    </li>
                    <li className={props.page === MY_GROUP? 'sideBar-item active' : 'sideBar-item'}>
                        <Link to={MY_GROUP} className="sideBar-link">
                            <i className="fas fa-users-cog sidebar_icon"></i>
                            MY GROUPS
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </>
    )
}

export default JobSidebar;