import styles from './Notification.module.css';
import { getAllByUser } from '../../../apis/NotifyApi.js';
import { useState, useEffect } from 'react'
import { updateSeen } from '../../../asset/js/API/NotifyAPI';
import { time_ago } from '../../../asset/js/utils';
import { useNavigate, useLocation } from 'react-router-dom';
function NotificationSideBar({ timeStamp }) {
    const idUser = JSON.parse(localStorage.getItem("user")).idUser;
    const [notifies, setNotify] = useState([]);
    //console.log("rerender ")

    //console.log(notifies);

    const navigate = useNavigate();
    useEffect(() => {
        getAllByUser(idUser).then(

            (res) =>

                res.json().then((data) => {
                    console.log(data);
                    setNotify(data);

                })
        );
    }, [timeStamp])

    const handleClick = (idNotify) => {

        updateSeen(idNotify).then((data) => {

        });
        navigate("/job");
    }

    const handleNavigate = (value) => {
        if (value.type.includes("Task"))
            navigate("/job");
        if (value.type.includes("Group"))
            navigate("/job/groups")
        if (value.type.includes("Project"))
            navigate("/job/Projects")
    }

    return (
        <div className={`${styles.sideBarNotification} test`}>
            <div className={styles.sideBarListficationList}>
                {
                    notifies.map((value, index) => {
                        return (
                            <div className={styles.sideBarNotificationItem} key={index}
                                //style={value.isSeen === false ? {backgroundColor:'#f6f6f6'} : null}
                                onClick={value.isSeen === false ? () => handleClick(value.idNotify) : () => handleNavigate(value)}>
                                <div style={{}}>
                                    {value.name}
                                </div>
                                <div className={styles.time}>
                                    {time_ago(value.timeCreated)}
                                </div>
                                <div style={value.isSeen === false ? { color: '#1876f1' } : {}}>
                                    {value.content}
                                </div>
                                <div className={styles.line}>

                                </div>
                            </div>
                        );
                    })
                }
            </div>

        </div>
    )
}
export default NotificationSideBar;