import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import { sendMessage } from '../api';
import { useNavigate } from 'react-router-dom';

const Chat = ({ loggedInUserUUID, receiverUUID, token }) => {
  // const { chatId } = useParams();  // Extract chatId from URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  let sortedUUIDs = [loggedInUserUUID, receiverUUID];
  sortedUUIDs.sort();  // Sort UUIDs in lexicographical order
  const chatId = sortedUUIDs.join('');
  
  useEffect(() => {
    const pusher = new Pusher('ac26a2bfa2c2d993beef', {
      cluster: 'mt1',
    });
    Pusher.logToConsole = true;
    

    const channel = pusher.subscribe(chatId);
    channel.bind(loggedInUserUUID, (data) => {
      if(data.msg.length > 1){
        setMessages((prevMessages) => [...prevMessages, { sender_name: data.sender, message: data.msg }]);
      }
      
    });

    return () => {
      pusher.unsubscribe(`${loggedInUserUUID-receiverUUID}`);
    };
  }, []);

  

  const handleSendMessage = async () => {
    console.log(loggedInUserUUID);
  //   let sortedUUIDs = [loggedInUserUUID, receiverUUID];
  // sortedUUIDs.sort();  // Sort UUIDs in lexicographical order
  // chatId = sortedUUIDs.join('');
    const payload = {
      sender: loggedInUserUUID,
      receiver: receiverUUID,
      message: newMessage,
      chat_id: chatId,
      person_1: loggedInUserUUID,
      person_2: receiverUUID
    };

    console.log(JSON.stringify(payload))

    await sendMessage(payload, token);
    
    setMessages(prevMessages => [
      ...prevMessages,
      { sender_name: 'You', message: payload.message }
    ]);
  };

  const handleViewAllChat = async () =>{
    navigate(`/user-chats/${chatId}/${loggedInUserUUID}`);
  }

  return (
    <div>
      <h2>Chat</h2>
      <div id="messageDisplay">
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.sender_name}: {msg.message}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
      <button onClick={handleViewAllChat}>View all Chats</button>
    </div>
  );
};

export default Chat;
