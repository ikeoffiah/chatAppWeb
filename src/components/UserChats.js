
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMessages } from '../api';

function UserChats() {
  const { id, userId } = useParams();
  const [userChat, setUserChatList] = useState([]);
  
  useEffect(() => {
    getMessages(id).then((data) => {
        console.log(JSON.stringify(data.data))
        setUserChatList(data.data)
      });
      
  }, []);

  return (
    <div>
      <h2>Users Chats</h2>
      <ul>
        {userChat.map((user) => (
          <li key={user.sender}>
          {user.sender == userId? 'You': user.sender}: {user.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserChats;
