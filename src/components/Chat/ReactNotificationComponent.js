import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from  './Notification.module.css';
export const ReactNotificationComponent = ({ title, body }) => {
  console.log("noty " + title , body )
  toast.info(<Display />);
  function Display() {
    return (
      <div className={styles.text}>
        <div>{title}</div>
        <div>{body}</div>
      </div>
    );
  }
  return (
    <ToastContainer />
  );
};