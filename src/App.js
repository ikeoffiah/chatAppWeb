import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';
import Chat from './components/Chat';
import UserChats from './components/UserChats';
import { fetchUsers } from './api';

const App = () => {
  const [token, setToken] = useState('');
  const [loggedInUserUUID, setLoggedInUserUUID] = useState('');
  const [userList, setUserList] = useState([]);
  const [receiverUUID, setReceiverUUID] = useState('');
  const [chatId, setChatId] = useState('');
  
  const navigate = useNavigate();  // Initialize navigate hook

  useEffect(() => {
    if(token){
      fetchUsers().then((data) => {
        console.log(JSON.stringify(data.data))
        setUserList(data.data)
      });
    }
      // navigate('/users'); 
  }, [token,navigate]);

  const handleUserSelect = (clickedUserUUID) => {
    const sortedUUIDs = [loggedInUserUUID, clickedUserUUID].sort();
    const chatId = sortedUUIDs.join('');
    setReceiverUUID(clickedUserUUID);
    setChatId(chatId);
    navigate(`/chat/${chatId}`);  // Navigate to chat page
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} setLoggedInUserUUID={setLoggedInUserUUID} />} />
        <Route 
          path="/users" 
          element={<UserList users={userList} onUserSelect={handleUserSelect} />} 
        />
        <Route 
          path="/chat/:chatId" 
          element={<Chat chatId={chatId} loggedInUserUUID={loggedInUserUUID} receiverUUID={receiverUUID} token={token} />} 
        />
         <Route path="/user-chats/:id/:userId" element={<UserChats />} />
      </Routes>
    </div>
  );
};

export default App;
