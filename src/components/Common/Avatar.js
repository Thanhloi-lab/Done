import './Avatar.css'
import usersSlice from '../User/UsersSlice';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';


const Avatar = ({children, type, onClick, user})=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRedirectInfo = ()=>{
        navigate('/user/info')
    }

    const handleRedirectNotification = ()=>{
        navigate('/notification')
    }

    const handleLogout = ()=>{
        dispatch(usersSlice.actions.removeUser());
        localStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <div className="header__navbar-item header__navbar-user">
            <img src='/images/penguin1.png' className="header__navbar-user-avatar"/>
            <span className="header__navbar-user-name">{user.name}</span>
            <ul className="header__navbar-user-menu">
                <li className="header__navbar-user-item">
                    <span onClick={()=>handleRedirectInfo()}>Tài khoản của tôi</span>
                </li>
                <li className="header__navbar-user-item">
                    <span onClick={()=>handleRedirectNotification()}>Thông báo</span>
                </li>
                <li className="header__navbar-user-item header__navbar-user-item--sapareate">
                    <span onClick={()=>handleLogout()}>Đăng xuất</span>
                </li>
            </ul>
        </div>
    )
}
export default Avatar
