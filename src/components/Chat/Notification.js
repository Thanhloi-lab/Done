import react, {useState,useEffect} from 'react';
import {getToken} from '../../firebaseInit.js';
const Notifications = (props) => {
    const [isTokenFound, setTokenFound] = useState(false);                
    console.log("Token found", isTokenFound);
    useEffect(() => {
      let data;
      async function tokenFunc() {
        data = await getToken(setTokenFound);
        if (data) {
          localStorage.setItem("token_notyfi",data);
        }
        return data;
      }
      tokenFunc();
    }, [setTokenFound]);
    return <></>;
   };
  export default Notifications;