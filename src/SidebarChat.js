import React from 'react'
import './SidebarChat.css';
import { Avatar } from '@mui/material';

function SidebarChat({roomName, lastmsg}) {
    return (
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat_info">
                <h2>{roomName.charAt(0).toUpperCase() + roomName.slice(1)}</h2>
                <p>{lastmsg}</p>
            </div>

        </div>
    )
}

export default SidebarChat
