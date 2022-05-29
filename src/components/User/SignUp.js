import { memo, useState } from 'react';
import clsx from 'clsx';
import { Link, Navigate } from 'react-router-dom';

import styles from '../Common/Form.module.css'
import '../Common/util.css'
import { validate } from '../../asset/js/validation.js'
import { register } from '../../apis/UserApi.js'
import { Toast } from 'bootstrap';

function SignUp() {

    const initValue = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        avatar: null
    };
    const [input, setInput] = useState(initValue);
    const [avatar, setAvatar] = useState('images/img-login.png');
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

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
        var res = await register(input);
        var data = await res.text();
        if (res.status === 200) {
            window.location = '/verify-email/' + input.email;
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
            setInput({
                ...input,
                avatar: event.target.files[0]
            })
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
                        </div>

                        <div className={clsx(styles.login100Form, styles.validateForm)}>
                            <span className={styles.login100FormTitle}>
                                Register
                            </span>

                            {message ? <div className={styles.textCenter + " p-b-12"}>
                                <span className={styles.txt1} style={{ color: "red" }}>
                                    {message}
                                </span>
                            </div> : null}

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate="Valid email is required: ex@abc.xyz">

                                <input className={styles.input100} type="text" name="email"
                                    placeholder="Email" onBlur={handleInputValidation}
                                    onChange={e => {
                                        setInput({
                                            ...input,
                                            email: e.target.value
                                        })
                                    }}
                                />

                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate="Must enter your name">

                                <input className={styles.input100} type="text" name="name"
                                    placeholder="Name" onBlur={handleInputValidation}
                                    onChange={e => {
                                        setInput({
                                            ...input,
                                            name: e.target.value
                                        })
                                    }}
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
                                    }}
                                />

                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>

                                    <i class="fa-solid fa-phone" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className={clsx(styles.wrapInput100, styles.validateInput)} data-validate="Password must be 8 chars include number and uppercase">
                                <input className={styles.input100} type="password" name="password"
                                    placeholder="Password" onBlur={handleInputValidation}
                                    onChange={e => {
                                        setInput({
                                            ...input,
                                            password: e.target.value
                                        })
                                    }}
                                />

                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className={clsx(styles.wrapInput100, styles.validateInput)}
                                data-validate="Confirm-password is not match">
                                <input className={styles.input100} type="password" name="confirm-password"
                                    placeholder="Confirm-password" onBlur={handleInputValidation}
                                    onChange={e => {
                                        setInput({
                                            ...input,
                                            confirmPassword: e.target.value
                                        })
                                    }}
                                />

                                <span className={styles.focusInput100}></span>
                                <span className={styles.symbolInput100}>
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className={styles.containerLogin100FormBtn}>
                                <button className={styles.login100FormBtn} onClick={handleSubmit}>
                                    Register
                                </button>
                            </div>


                            <div className={styles.textCenter + " p-t-136"}>
                                <Link to='/sign-in' className={styles.txt2}>
                                    You have an account
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

export default memo(SignUp);