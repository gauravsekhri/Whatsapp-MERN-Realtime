import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';
import Login from './Login';


function App() {

  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState("");

  useEffect(() => {
      axios.get('allrooms/a1b2c3')
      .then(res => {
        setMessages(res.data.messageList);
      });

      axios.get('message/sync')
      .then(response => {
        setRooms(response.data);
      })
  }, [])

  function dec2hex (dec) {
    return dec.toString(16).padStart(2, "0")
  }
  
  function generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }
  //console.log("id ",generateId(10))

  useEffect(() => {
    //once
    var pusher = new Pusher('4a530750d0da4a287e56', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('updated', (newMessage) => {
      // setMessages([...messages, newMessage]) //keep all current messages but also include new one
      axios.get('allrooms/a1b2c3')
      .then(res => {
        setMessages(res.data.messageList);
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]);

  console.log("messages", messages);

  const [username, setUsername] = useState(null);

  const getUser = (data) => {
    setUsername(data);
  }

  const [useruid, setUseruid] = useState(null);

  const getUserUID = (x) => {
    setUseruid(x);
  }

  const getUserData = (x) => {
    setUsername(x.uname);
  }

  return (
    <div className="App">

      {!username ? (
        <Login getUserData={getUserData}/>
      ) : (
        <div className="app_body">
        <Sidebar messages={messages} username={username} rooms={rooms}/>
        <Chat messages={messages} username={username} rooms={rooms}/>
      </div>

      )}

    </div>
  );
}

export default App;
