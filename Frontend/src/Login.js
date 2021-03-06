import React, { useState } from 'react';
import './Login.css';
// import {getAuth, signInWithPopup} from 'firebase/auth';
// import {GoogleAuthProvider} from 'firebase/auth';
import axios from './axios';


function Login({getUserData}) {

    const [uname, setUname] = useState("");
    const [userpwd, setUserpwd] = useState("");

    // const signIn = () => {
    //     const auth = getAuth();
    //     const ab = new GoogleAuthProvider();
    //     signInWithPopup(auth, ab)
    //     .then(x => {
    //         // dispatch({
    //         //     user: x.user.displayName
    //         // })
    //         // setUsername(x.user.displayName);
    //         // getUser(x.user.displayName);
    //         // getUserUID(x.user.uid);
    //         getUserData(x);
    //         console.log(x);
    //         console.log("UID : ", x.user.uid);
    //         // console.log(x.user.displayName);
    //     })
    // }

    const login = () => {
        document.getElementById("errormsg").innerHTML = "Checking...";
        axios.get('users/' + uname)
        .then(res => {
            console.log("this user", res.data.pwd);
            if(userpwd === res.data.pwd){
                console.log("login successful");
                document.getElementById("errormsg").style.color = "green";
                document.getElementById("errormsg").innerHTML = "Login Successful";
                getUserData(res.data);
            }
            else{
                console.log("login error");
                document.getElementById("errormsg").innerHTML = "Invalid Credentials";
            }
        })
    }

    return (
        <div className="login">
            <div className="login_container">
                <img src="data:image/jpeg;base64,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" alt="img"/>
                <div className="login_text">
                    <h1>Login to Whatsapp</h1>
                </div>
                {/* <button onClick={signIn} type="submit">SignIn with Google</button> */}
                <div className="inputbox_inner">
                    <div id="errormsg"></div>
                    <input type="text" placeholder="Username" onChange={e => setUname(e.target.value)} className="credentials mb-10" autoComplete="off"/>
                    <input type="password" placeholder="Password" onChange={e => setUserpwd(e.target.value)} className="credentials" autoComplete="off"/>
                    <button onClick={login} className="loginBtn">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login
