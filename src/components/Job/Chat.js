import {memo, useState} from 'react';
import clsx from 'clsx';
import './Chat.css'

function Chat(){

    console.log("job-home component rendered");


    const showModal= ()=>{
        if(window.innerWidth<=960){
            document.getElementById('modal').classList.add('modal');
            document.getElementById('modal__overlay').style.display= 'block';
            document.getElementById('modal').style.zIndex= '1000';
        }
        
    }

    const hideModal= ()=>{
        if(window.innerWidth<=960){
            document.getElementById('modal').classList.remove('modal');
            document.getElementById('modal__overlay').style.display= 'none';
        }
        
    }




    return (
        <div id="modal">
            <input type="checkbox" id="check-message"/>
            <label htmlFor="check-message" className="check-label">
                <i className="far fa-comment-dots" id='btn-message' onClick={showModal}></i>
                <i className="fas fa-times" id='cancel-message' onClick={hideModal}></i>
            </label>
            <div className="modal__overlay" id="modal__overlay"></div>
            <div className="chatWrapper">
                <span style={{fontSize:'5rem'}}>Message</span>
            </div>
        </div>
    )
}

export default Chat;