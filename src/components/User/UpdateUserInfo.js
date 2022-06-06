import { memo, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { Link, Navigate } from 'react-router-dom';

import styles from '../Common/Form.module.css'
import '../Common/util.css'
import { validate } from '../../asset/js/validation.js'
import { editInfo, getUserInfoById, editAvatar } from '../../apis/UserApi.js'
import { useSnackbar } from 'notistack';
import { API_URL } from '../../asset/js/constant';

function UpdateUserInfoComponent() {

    const idUser = JSON.parse(localStorage.getItem("user")).idUser;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();



    var initValue = {
        id: idUser,
        name: '',
        phone: ''
    };

    const [input, setInput] = useState(initValue);
    const [avatar, setAvatar] = useState('images/img-login.png');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState(null);


    const handerNotify = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant
        });
    }

    useEffect(() => {
        getUserInfoById(idUser).then(
            (res) => res.json().then((data) => {
                console.log("userEffect")
                setInput({

                    id: idUser,
                    name: data.name,
                    phone: data.phone
                });
                setAvatar(API_URL + '/' + data.avatar);
            }))
    }, [])



    const handleInputValidation = (event) => {
        const inputValue = event.target.parentNode;
        let checked;

        if (event.target.getAttribute("name") === 'confirm-password') {
            checked = validate(input, event.target.getAttribute("name"));
        }
        else {
            checked = validate(event.target.value, event.target.getAttribute("name"));
        }

        if (!checked) {
            inputValue.classList.add(styles.alertValidate);
        }
        else {
            inputValue.classList.remove(styles.alertValidate);
        }
    }

    const handleSubmit = async (event) => {
        var res = await editInfo(input);

        var data = await res.text();
        if (res.status === 200) {
            handerNotify(data, 'success');
        } else {
            handerNotify(data, 'error');
        }
    }

    const handleSubmitAvatar = async (event) => {
        var res = await editAvatar({ id: idUser, avatar: image });
        var data = await res.text();
        if (res.status === 200) {
            //new Toast('Cập nhật thành công');
        } else {
            setMessage(data);
        }
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            var url = URL.createObjectURL(event.target.files[0]);
            var fileName = event.target.files[0];
            var match = /\.(\w+)$/.exec(fileName);
            var type = match ? `image/${match[1]}` : `image`;
            setAvatar(url);
            setImage(event.target.files[0]);
        }
    }

    return (
        <>
            <div className={styles.limiter}>
                <div className={styles.containerLogin100}>
                    <div className={styles.wrapLogin100}>
                        <div className={styles.login100Pic} animation="js-tilt" data-tilt>
                            <label htmlFor='image' style={{ display: "block" }}>
                                <img src={avatar} alt="IMG" className={styles.circularSquare} name='avatar' />
                            </label>
                            <input type="file" onChange={onImageChange} id="image" accept='image/*' hidden />
                            {image ?
                                <div className={styles.containerLogin100FormBtn}>
                                    <button className={styles.login100FormBtn} onClick={handleSubmitAvatar}>
                                        UPDATE
                                    </button>
                                </div> : null
                            }
                        </div>


                        <div className={clsx(styles.login100Form, styles.validateForm)}>
                            <span className={styles.login100FormTitle}>
                                Update user info
                            </span>



                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate="Must enter your name">

                                <input className={styles.input100} type="text" name="name"
                                    placeholder="Name" onBlur={handleInputValidation}
                                    onChange={e => {
                                        setInput({
                                            ...input,
                                            name: e.target.value
                                        })
                                    }} value={input.name}
                                />

                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    <i class="fa-solid fa-person" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate="Phone must 10 number and start whit 0">

                                <input className={styles.input100} type="text" name="phone"
                                    placeholder="Phone" onBlur={handleInputValidation}
                                    onChange={e => {
                                        setInput({
                                            ...input,
                                            phone: e.target.value
                                        })
                                    }} value={input.phone}
                                />

                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>

                                    <i class="fa-solid fa-phone" aria-hidden="true"></i>
                                </span>
                            </div>



                            <div className={styles.containerLogin100FormBtn}>
                                <button className={styles.login100FormBtn} onClick={handleSubmit}>
                                    UPDATE
                                </button>
                            </div>

                            {message ? <div className={styles.textCenter + " p-t-12"}>
                                <span className={styles.txt1} style={{ color: "red" }}>
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