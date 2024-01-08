import React, { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => history("/"))
      .catch((e) => alert("Unable to sign out"));
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history("/");
      return;
    }

    const headers = {
      "Project-ID": process.env.REACT_APP_CHAT_ENGINE_ID,
      "User-Name": user.displayName,
      "User-Secret": user.uid,
    };

    // Axios GET request example
    axios
      .get("https://api.chatengine.io/users/me", { headers })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.displayName);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then((res) => {
              setLoading(false);
            })
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return "loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">FindMe</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.displayName}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
