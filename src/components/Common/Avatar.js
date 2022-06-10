import './Avatar.css'
import usersSlice from '../User/UsersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../asset/js/constant';



const Avatar = ({ user, setToken }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRedirectInfo = () => {
        navigate('/user/info')
    }

    const handleRedirectNotification = () => {
        navigate('/notification')
    }

    const handleLogout = () => {
        dispatch(usersSlice.actions.removeUser());
        setToken(usersSlice.initUser);
        localStorage.removeItem("user");
        // window.location.reload();
    }

    const handleRedirectChange = () => {
        console.log(user)
        navigate('/change-password')
    }

    //const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="header__navbar-item header__navbar-user">
            <img src={user.avatar ? `${API_URL}/${user.avatar}` : '/images/penguin1.png'
            }
                className="header__navbar-user-avatar" />
            <span className="header__navbar-user-name">{user.name}</span>
            <ul className="header__navbar-user-menu">
                <li className="header__navbar-user-item">
                    <span onClick={() => handleRedirectInfo()}>My Account</span>
                </li>
                <li className="header__navbar-user-item">
                    <span onClick={() => handleRedirectChange()}>Change Password</span>
                </li>

                <li className="header__navbar-user-item header__navbar-user-item--sapareate">
                    <span onClick={() => handleLogout()}>Log out</span>
                </li>
            </ul>
        </div>
    )
}
export default Avatar
