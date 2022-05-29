import {memo, useState} from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from '../Common/Form.module.css'
import '../Common/util.css'
import {validate} from '../../asset/js/validation.js'
import {changePassword,API_URL} from '../../apis/UserApi.js'

function ChangePasswordComponent(){
    //console.log("ForgotPassword component rendered");
    const user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);
    const initValue = {
        id: user.idUser,
        password: null,
        newPassword: null,
        confirmNewPassword: null    
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
        var response = await changePassword(input);
        var data = await response.text();
        if(response.status === 200)
        {
            localStorage.removeItem("user");
            alert('bạn phải đăng nhập lại bằng mật khẩu mới');           
            window.location = '/sign-in'
        }else
        {
            setMessage(data)
        }
    }

    return (
        <>
            <div className={styles.limiter}>
                <div className={styles.containerLogin100}>
                    <div className={styles.wrapLogin100}>
                        <div className={styles.login100Pic} animation= "js-tilt" data-tilt>
                            <img src={API_URL + '/' + user.avatar} alt="IMG"/>
                        </div>

                        <div className={clsx(styles.login100Form, styles.validateForm)}>
                            <span className={styles.login100FormTitle}>
                                Đổi mật khẩu
                            </span>
                            
                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate = "Password must be 8 chars include number and uppercase">
                                <input className={styles.input100} type="password" name="oldPassword" 
                                    placeholder="Password" onBlur={handleInputValidation}
                                    onChange={e=>{setInput({
                                        ...input,
                                        password: e.target.value
                                    })}}
                                />
                                
                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate = "Password must be 8 chars include number and uppercase">
                                <input className={styles.input100} type="password" name="password" 
                                    placeholder="New Password" onBlur={handleInputValidation}
                                    onChange={e=>{setInput({
                                        ...input,
                                        newPassword: e.target.value
                                    })}}
                                />
                                
                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} 
                                data-validate = "Confirm-password is not match">
                                <input className={styles.input100} type="password" name="confirm-password" 
                                    placeholder="Confirm-password" onBlur={handleInputValidation}
                                    onChange={e=>{setInput({
                                        ...input,
                                        confirmNewPassword: e.target.value
                                    })}}
                                />
                                
                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            {message ? <div className={styles.textCenter + " p-t-12"}>
                                <span className={styles.txt1} style={{color:"red"}}>
                                    {message} 
                                </span>
                            </div> : null}

                            <div className={styles.containerLogin100FormBtn}>
                                <button className={styles.login100FormBtn} onClick={handleSubmit}>
                                    Đổi mậ khẩu
                                </button>
                            </div>
                            
                          

                           

                         
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ChangePasswordComponent);