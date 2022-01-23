import React, { useState } from 'react';
import './Chat.css'
import { Avatar, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmotionIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import axios from './axios';

function Chat({ messages, username, rooms }) {

    const [input, setInput] = useState("");

    var roomName = "";

    for(var i=0; i<rooms[0].Users.length; i++){
        if(rooms[0].Users[i] !== username){
            roomName = rooms[0].Users[i];
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        var msg = input.trim();
        if(msg.length>0){
            messages.push({msgText : input.trim(), from : username})
            await axios.put("/allrooms/update/a1b2c3", 
                messages
            )
            .then(x => {
                if(x.status === 200){
                    let items = document.querySelector(".chat_body");
                    items.scrollTop = items.scrollHeight;
                }
            })
            setInput("");
        }
    }

    return (
        <div className="chat">

            <div className="chat_header">
                <Avatar/>
            
                <div className="chat_headerInfo">
                    <h3>{roomName.charAt(0).toUpperCase() + roomName.slice(1)}</h3>
                    <p>Last seen at 17:45</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">

                { messages.map((message, index) => (
                    <div key={index} className={`chat_message ${(message.from === username) && "chat_reciever"}`}>
                        {/* <div className="chat_name">name</div> */}
                        {message.msgText}
                        {/* <div className="chat_timestamp">time</div> */}
                    </div>
                ))}

            </div>

            <div className="chat_footer">
                <IconButton>
                    <InsertEmotionIcon/>
                </IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a Message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send Message</button>
                </form>
                <IconButton onClick={sendMessage}>
                    <SendIcon/>
                </IconButton>
            </div>

        </div>
    ) 
}

export default Chat
