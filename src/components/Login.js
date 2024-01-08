import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { auth } from "./firebase";
import Typewriter from 'typewriter-effect'
import {GoogleAuthProvider, signInWithRedirect, FacebookAuthProvider} from 'firebase/auth'

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card"> 
        <h2> Welcome to FindMe</h2>
        <Typewriter
        options={{
            autoStart: true,
            delay: 50,
            loop: true,
            strings: "Sign in with your desired option to get started",
          }}/>
          <br/>
          <br/>
          <br/>
        <div
          className="login-button google"
          onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign In With Google
        </div>

        <br />
        <br />

        <div className="login-button facebook"
        onClick={() => signInWithRedirect(auth, new FacebookAuthProvider())}
        >
          <FacebookOutlined /> Sign In With Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
