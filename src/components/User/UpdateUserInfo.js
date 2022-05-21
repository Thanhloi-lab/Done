import {memo, useEffect, useState} from 'react';
import clsx from 'clsx';
import { Link, Navigate } from 'react-router-dom';

import styles from '../Common/Form.module.css'
import '../Common/util.css'
import {validate} from '../../asset/js/validation.js'
import {editInfo, getUserInfoById } from '../../apis/UserApi.js'
import { Toast } from 'bootstrap';

function UpdateUserInfoComponent(){
  
    const idUser = JSON.parse(localStorage.getItem("user")).idUser;
   
    const initValue = {
        id:'',
        name: '',
        phone: '',
    };
    const [input, setInput] = useState(initValue);
    const [avatar, setAvatar] = useState('images/img-login.png');
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);


     
    useEffect(()=> {
        getUserInfoById(idUser).then((res) => 
        {
            setInput({
                id:idUser,
                name: res.name,
                phone: res.phone
            })
        })
    
    },[input.id]);


    const handleInputValidation = (event) =>{
        const inputValue = event.target.parentNode;
        let checked;
        
        if(event.target.getAttribute("name")==='confirm-password'){
            checked = validate(input, event.target.getAttribute("name"));
        }
        else{
            checked = validate(event.target.value, event.target.getAttribute("name"));
        }
        
        if(!checked){
            inputValue.classList.add(styles.alertValidate);
        }
        else{
            inputValue.classList.remove(styles.alertValidate);
        }
    }

    const handleSubmit = async (event)=>{
        var res = await editInfo(input);
        var data = await res.text();
        if(res.status === 200)
        {
           window.location = '/verify-email/' + input.email;
        }else
        {
            setMessage(data);
        }
    }
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            var url = URL.createObjectURL(event.target.files[0]);
            var fileName  = event.target.files[0];
            var match = /\.(\w+)$/.exec(fileName);
            var type = match ? `image/${match[1]}` : `image`;
            setAvatar(url);
            setInput({
                ...input,
                avatar:  event.target.files[0] 
            })
          }
    }

    return (
        <>
            <div className={styles.limiter}>
                <div className={styles.containerLogin100}>
                    <div className={styles.wrapLogin100}>
                        <div className={styles.login100Pic} animation= "js-tilt" data-tilt>                             
                            <label htmlFor='image' style={{display:"block"}}>
                                <img src={avatar} alt="IMG" className={styles.circularSquare} name='avatar'/>  
                            </label>     
                            <input type="file" onChange={onImageChange} id="image" accept='image/*' hidden  />                 
                        </div>
                       

                        <div className={clsx(styles.login100Form, styles.validateForm)}>
                            <span className={styles.login100FormTitle}>
                                Cập nhật thông tin cá nhân
                            </span>

                            

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate = "Must enter your name">

                                <input className={styles.input100} type="text" name="name" 
                                    placeholder="Name" onBlur={handleInputValidation} 
                                    onChange={e=>{setInput({
                                        ...input,
                                        name: e.target.value
                                    })}} value = {input.name}
                                />

                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    <i class="fa-solid fa-person" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate = "Phone must 10 number and start whit 0">

                                <input className={styles.input100} type="text" name="phone" 
                                    placeholder="Phone" onBlur={handleInputValidation} 
                                    onChange={e=>{setInput({
                                        ...input,
                                        phone: e.target.value
                                    })}} value={input.phone}
                                />

                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    
                                    <i class="fa-solid fa-phone" aria-hidden="true"></i>
                                </span>
                            </div>

                           
                            
                            <div className={styles.containerLogin100FormBtn}>
                                <button className={styles.login100FormBtn} onClick={handleSubmit}>
                                    Cập nhật
                                </button>
                            </div>

                            {message ? <div className={styles.textCenter + " p-t-12"}>
                                <span className={styles.txt1} style={{color:"red"}}>
                                    {message} 
                                </span>
                            </div> : null}

                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(UpdateUserInfoComponent);