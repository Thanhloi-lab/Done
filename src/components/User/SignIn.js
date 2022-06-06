import React ,{memo, useState, useEffect} from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from '../Common/Form.module.css'
import '../Common/util.css'
import {validate} from '../../asset/js/validation.js'
import {login} from '../../apis/UserApi'

import { Alert } from 'bootstrap';

function SignIn(){
    
    const initValue = {
        email:'',
        password:''
    };
    const [input, setInput] = useState(initValue);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        document.getElementById("btnLogin").addEventListener("click", function(event){
            event.preventDefault()
          });
    },[])


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


    const handleSubmit = async(s,e) =>{
        //e.preventDefault();
        const res = await login(input);
        var data = await res.text();
        
        if(res.status === 200)
        {
            localStorage.setItem('user',data);           
            window.location.pathname='';
        }else
        {
            if(data === 'Vui lòng kích hoạt tài khoản')
                window.location = '/verify-email/' + input.email;
            setMessage(data);
        }
    }

    return (
        <>
            <div className={styles.limiter}>
                <div className={styles.containerLogin100}>
                    <div className={styles.wrapLogin100}>
                        <div className={styles.login100Pic} animation= "js-tilt" data-tilt>
                            <img src="images/img-login.png" alt="IMG"/>
                        </div>

                        <form className={clsx(styles.login100Form, styles.validateForm)}>
                            <span className={styles.login100FormTitle}>
                                Member Login
                            </span>

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate = "Valid email is required: ex@abc.xyz">

                                <input className={styles.input100} type="text" name="email" 
                                    placeholder="Email" onBlur={handleInputValidation} 
                                    onChange={e=>{setInput({
                                        ...input,
                                        email: e.target.value
                                    })}}
                                />

                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate = "Password must be 8 chars include number and uppercase">
                                <input className={styles.input100} type="password" name="password" 
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
                            
                            <div  className={styles.containerLogin100FormBtn}>
                                <button id='btnLogin' className={styles.login100FormBtn} onClick={handleSubmit}>
                                    Login
                                </button>
                            </div>

                            {message ? <div className={styles.textCenter + " p-t-12"}>
                                <span className={styles.txt1} style={{color:"red"}}>
                                    {message} 
                                </span>
                            </div> : null}

                            <div className={styles.textCenter + " p-t-12"}>
                                <span className={styles.txt1}>
                                    Forgot 
                                </span>
                                <Link to='/forgot-password' className={styles.txt2}>
                                    Username / Password?
                                </Link>
                            </div>

                            <div className={styles.textCenter + " p-t-136"}>
                                <Link to='/sign-up' className={styles.txt2}>
                                    Create your Account
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(SignIn);