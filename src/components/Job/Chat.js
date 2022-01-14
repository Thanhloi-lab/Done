import {memo, useState, useEffect, useRef} from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import './Chat.css'

function Chat(){

    console.log("job-home component rendered");

    const [ connection, setConnection ] = useState(null);
    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7168/chatHub')
            .withAutomaticReconnect()
            .build();
        
        setConnection(newConnection);
    }, []);

    

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user, message) => {
        // const chatMessage = {
        //     user: user,
        //     message: message
        // };
        
        try {
            await connection.send('SendMessage', user, message);
        }
        catch(e) {
            // console.log(e);
        }

        // if (connection.connectionStarted) {
        //     try {
        //         await connection.send('SendMessage', chatMessage);
        //     }
        //     catch(e) {
        //         console.log(e);
        //     }
        // }
        // else {
        //     alert('No connection to server yet.');
        // }
    }

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


    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = 'user';
        const isMessageProvided = 'test';

        if (isUserProvided && isMessageProvided) {
            sendMessage(isUserProvided, isMessageProvided);
        } 
        else {
            alert('Please insert an user and a message.');
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
                <span style={{fontSize:'5rem'}}>
                    Message
                </span> 
                <button onClick={onSubmit} style={{fontSize:'5rem'}}> Click me</button>
            </div>


        </div>
    )
}

export default memo(Chat);