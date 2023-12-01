import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import arrow from '../assets/Music-dashboard-icons.svg'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [clickedChat, setClickedChat] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    const getUsers = async () => {
      const q = query(collection(db, "users"), where("uid", "!=", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const userList = [];
      querySnapshot.forEach((doc) => {
        userList.push(doc.data());
      });
      setUsers(userList);
    };

    currentUser.uid && getChats();
    getUsers();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setClickedChat(u);
  };

  const handleUserSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDoc = await getDoc(chatDocRef);

      if (chatDoc.exists()) {
        dispatch({ type: "CHANGE_USER", payload: user });
      } else {
        await setDoc(chatDocRef, { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });


        dispatch({ type: "CHANGE_USER", payload: user });
      }
    } catch (err) {
      console.error("Error selecting user:", err);
    }
  };

  return (
    <div className="chats">
      <h2 style={{ padding: "15px", borderRadius: "10px", color: "#fff", textAlign: "left" }}>Online Now</h2>
      <div className="userContainer">
      {users.slice(0, 5).map((user) => (
        <div className="users" key={user.uid} onClick={() => handleUserSelect(user)}>
          <img src={user.photoURL} alt=""/>
        </div>
      ))}
      <span className="more1">More<img className="arrow" src={arrow} alt="arrow" /></span>
      </div>
      <h2 style={{ padding:"10px",color: "#fff", textAlign: "left" }}>Messages</h2>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
