import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import "./Chat.css";
import db from "../../firebase/firebase";
import Message from "../../components/message/Message";
import ChatBox from "../../components/chatBox/ChatBox";

const Chat = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    // console.log(roomId);
    // runs this code when Chat component loads and room id changes
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setRoomMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-header-left">
          <h4 className="chat-channelname">
            <strong> #{roomDetails?.name} </strong>
            <StarBorderOutlinedIcon />
          </h4>
        </div>
        <div className="chat-header-right">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>

      <div className="chat-messages">
        {/* Messages */}
        {roomMessages.map(({ message, timestamp, user, userImage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
          />
        ))}
      </div>

      <ChatBox channelName={roomDetails?.name} channelID={roomId} />
    </div>
  );
};

export default Chat;
