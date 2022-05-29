import {memo, useState} from 'react';
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';

import styles from '../Common/Form.module.css'
import '../Common/util.css'
import {validate} from '../../asset/js/validation.js'
import {verifyEmail} from '../../apis/UserApi.js'

const VerifyEmailComponent = () => {
    //console.log("ForgotPassword component rendered");
    
    const {email} = useParams();
    const initValue = {
        email:email,
        token:''
    };
    
    const [input, setInput] = useState(initValue);
    const [message, setMessage] = useState(null);

   

    const handleInputValidation = (event) =>{
        const inputValue = event.target.parentNode;
        const checked = validate(event.target.value, event.target.getAttribute("name"));
        
        if(!checked){
            inputValue.classList.add(styles.alertValidate);
        }
        else{
            inputValue.classList.remove(styles.alertValidate);
        }
    }

    const handleSubmit = async (event)=>{
        var response = await verifyEmail(input);
        var data = await response.text();
        if(response.status === 200)
        {
           window.location = '/sign-in';

        }else
        {
            if(response.status === 400)
                setMessage(data);
        }
    }

    return (
        <>
            <div className={styles.limiter}>
                <div className={styles.containerLogin100}>
                    <div className={styles.wrapLogin100}>
                        <div className={styles.login100Pic} animation= "js-tilt" data-tilt>
                            <img src="/images/img-login.png" alt="IMG"/>
                        </div>

                        <div className={clsx(styles.login100Form, styles.validateForm)}>
                            <span className={styles.login100FormTitle}>
                                Xác nhận Email
                            </span>
                            

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate = "Valid email is required: ex@abc.xyz">

                                <input className={styles.input100} type="text" name="token" 
                                    placeholder="Token" onBlur={handleInputValidation} 
                                    onChange={e=>{setInput({
                                        ...input,
                                        token: e.target.value
                                    })}}
                                />

                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className={styles.containerLogin100FormBtn}>
                                <button className={styles.login100FormBtn} onClick={handleSubmit}>
                                    Xác nhận
                                </button>
                            </div>

                            {message ? <div className={styles.textCenter + " p-t-12"}>
                                <span className={styles.txt1} style={{color:"red"}}>
                                    {message} 
                                </span>
                            </div> : null}
                                                    

                            <div className={styles.textCenter + " p-t-136"}>
                                <Link to='/sign-in' className={styles.txt2}>
                                    Go back to login
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(VerifyEmailComponent);