import React, { useState } from "react";
import firebase from "firebase";

import "./ChatBox.css";
import db from "../../firebase/firebase";
import { useStateValue } from "../../store/stateProvider";

const ChatBox = ({ channelName, channelID }) => {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (event) => {
    event.preventDefault();

    if (channelID) {
      db.collection("rooms").doc(channelID).collection("messages").add({
        user: user.displayName,
        userImage: user.photoURL,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };

  return (
    <div className="chatbox">
      <form>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder={`Send a text to #${channelName?.toLowerCase()}`}
        />
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
