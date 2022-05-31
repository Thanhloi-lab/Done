import styles from  './Notification.module.css';
import {getAllByUser} from '../../../apis/NotifyApi.js';
import {useState, useEffect} from 'react'
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

    return (
        <div className= {styles.sideBarNotification}>
            <div className= {styles.sideBarListficationList}>
            {             
                notifies.map((value, index) => {
                    return (
                        <div className= {styles.sideBarNotificationItem} key={index}
                        style={value.isSeen === false ? {backgroundColor:'#81cff3'} : null}
                        >
                            <div style={{fontWeight: 'bold'}}>
                                {value.name}
                            </div>
                            <div>
                                {value.content}
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