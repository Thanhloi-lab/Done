import react, {useState,useEffect} from 'react';
import {getToken} from '../../firebaseInit.js';
import {registerDeivice} from '../../apis/UserApi.js';
const Notifications = (props) => {
    const [isTokenFound, setTokenFound] = useState(false);                
    console.log("Token found", isTokenFound);
    useEffect(() => {
      let data;
      async function tokenFunc() {
        data = await getToken(setTokenFound);
        
        if (data) {
          var user =  JSON.parse(localStorage.getItem("user"));
          if(user)
          {
            registerDeivice({userId:user.idUser, token:data});
          }
          localStorage.setItem("token_notyfi",data);
        }
        return data;
      }
      tokenFunc();
    }, [setTokenFound]);
    return <></>;
   };
  export default Notifications;