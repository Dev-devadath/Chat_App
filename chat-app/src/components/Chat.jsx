import React, { useContext } from "react";
import call from "../assets/Property 1=phone.svg";
import cam from "../assets/Property 1=video-camera.svg";
import More from "../assets/Option.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const { data } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleMoreButtonClick = () => {
    console.log("Chat ID:", data.chatId); 
    navigate(`/chat/${data.chatId}`);
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <img className="pfp" src={data.user.photoURL} alt="pfp" />
        <div className="username-container">
          <span className="username">{data.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <img src={call} alt="" />
          <img src={cam} alt="" />
          <img src={More} alt="More" onClick={handleMoreButtonClick} /> {}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
