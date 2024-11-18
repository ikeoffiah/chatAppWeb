// src/components/UserList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = ({ users, onUserSelect }) => {
  const navigate = useNavigate();  // Initialize navigate hook

  const handleClick = (userId) => {
    onUserSelect(userId);  // Handle user selection
    navigate(`/chat/${userId}`);  // Navigate to the chat page
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleClick(user.id)}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
