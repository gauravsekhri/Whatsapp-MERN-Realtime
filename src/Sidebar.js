import React, { useEffect, useState } from 'react';
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';

function Sidebar({messages, username, rooms}){

    //uppercase first letter of username
    const dispName = username.charAt(0).toUpperCase() + username.slice(1);

    var roomName = "";

    for(var i=0; i<rooms[0].Users.length; i++){
        if(rooms[0].Users[i] != username){
            roomName = rooms[0].Users[i];
        }
    }

    var lastMessage = "";

    if(messages.slice(-1)[0].msgText.length > 50){
        lastMessage = (messages.slice(-1)[0].msgText).substring(0, 50) + ' ....';
    }
    else{
        lastMessage = messages.slice(-1)[0].msgText
    }

    return(
        <div className="sidebar">
            <div className="sidebar_header">
                <div className="userBox">
                    <Avatar src="https://cdn.pixabay.com/photo/2016/03/31/19/57/avatar-1295406_960_720.png"/>
                    <h4>{dispName}</h4>
                </div>

                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon></DonutLargeIcon>
                    </IconButton>
                    <IconButton>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder="Start Chat"/>
                </div>
            </div>

            <div className="sidebar_chats">

            { rooms.map((room, index) => (
                <div key={index}>
                    <SidebarChat roomName={roomName} lastmsg={lastMessage}/>
                </div>
            ))}

            </div>
            
        </div>
    )
}

export default Sidebar