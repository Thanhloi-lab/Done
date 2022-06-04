import styles from  './Notification.module.css';
import {getAllByUser} from '../../../apis/NotifyApi.js';
import {useState, useEffect} from 'react'
import {updateSeen} from   '../../../asset/js/API/NotifyAPI';
import {time_ago} from   '../../../asset/js/utils';
function NotificationSideBar(){
    const idUser = JSON.parse(localStorage.getItem("user")).idUser;
    const [notifies, setNotify] = useState([]);
    console.log("rerender ")
    console.log(notifies);
    useEffect(() => {
        getAllByUser(idUser).then(
        
            (res) => 
                     
                res.json().then((data) => {
                console.log(data);
                setNotify(data);
                
            })
            );
    }, [])

    const handleClick  = (idNotify)  => {
        updateSeen(idNotify).then((data) => {

        });
    }

    return (
        <div className= {`${styles.sideBarNotification} test`}>
            <div className= {styles.sideBarListficationList}>
            {             
                notifies.map((value, index) => {
                    return (
                        <div className= {styles.sideBarNotificationItem} key={index}
                        //style={value.isSeen === false ? {backgroundColor:'#f6f6f6'} : null}
                        onClick = {value.isSeen === false ? ()=> handleClick(value.idNotify): null}>
                            <div style={{}}>
                                {value.name}
                            </div>
                            <div className={styles.time}>
                                {time_ago(value.timeCreated)}
                            </div>
                            <div style={value.isSeen === false ? {color:'#1876f1'}: {}}>
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