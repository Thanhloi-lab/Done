import styles from './Notification.module.css';
import { getAllByUser } from '../../../apis/NotifyApi.js';
import { getProjectById } from '../../../asset/js/API/ProjectApi.js';
import { getTaskById } from '../../../asset/js/API/TaskApi.js';
import { getGroupById } from '../../../asset/js/API/GroupApi.js';
import { useState, useEffect } from 'react'
import { updateSeen } from '../../../asset/js/API/NotifyAPI';
import { time_ago } from '../../../asset/js/utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
function NotificationSideBar({ timeStamp }) {
    const idUser = JSON.parse(localStorage.getItem("user")).idUser;
    const [notifies, setNotify] = useState([]);
    //console.log("rerender ")

    //console.log(notifies);
    const user = useSelector((state) => state.users);
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
        console.log(value)
        if (value.type.includes("Task")) {
            getTaskById(value.idTask, user.userInfo.token).then((result) => {
                getProjectById(result.idProject, user.userInfo.token).then((data) => {
                    if (data.createUser === user.userInfo.idUser) {
                        navigate(`/job/project/${result.idProject}`, {
                            state: {
                                idProject: result.idProject,
                                idGroup: result.idGroup,
                                createUser: data.createUser,
                            }
                        });
                    }
                    else {
                        navigate(`/job/memberTasks/${result.idProject}`, {
                            state: {
                                idProject: result.idProject,
                                idGroup: result.idGroup,
                                createUser: data.createUser,
                            }
                        });
                    }
                })
                    .catch((err) => console.log(err))
            })



        }
        if (value.type.includes("Group")) {
            getGroupById(value.idGroup, user.userInfo.token).then((result) => {
                if (result.createUser === user.userInfo.idUser) {
                    navigate("/job/myGroups")
                }
                else {
                    navigate("/job/groups")
                }
            })
        }

        if (value.type.includes("Project"))
            getProjectById(value.idProject, user.userInfo.token).then((result) => {
                if (result.createUser === user.userInfo.idUser) {
                    navigate(`/job/group/${result.idGroup}`, {
                        state: {
                            idGroup: result.idGroup,
                        }
                    });
                }
                else {
                    navigate(`/job/memberProjects/${result.idGroup}`, {
                        state: {
                            idGroup: result.idGroup,
                        }
                    });
                }
            })
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