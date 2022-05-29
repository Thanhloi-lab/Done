import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ReactNotificationComponent = ({ title, body }) => {
  console.log("noty " + title , body )
  toast.info(<Display />);
  function Display() {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    );
  }
  return (
    <ToastContainer />
  );
};