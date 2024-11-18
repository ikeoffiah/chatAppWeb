import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { jwtDecode } from "jwt-decode";

const Login = ({ setToken, setLoggedInUserUUID, }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();  

const getUserIdFromToken = (token) => {
    try {
        // Decode the token
        const decodedToken = jwtDecode(token);

        // Access the user_id from the decoded token
        return decodedToken.user_id || null; // Adjust key based on your token payload structure
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const data = await login(credentials);
      console.log(data.data.user)
      setToken(data.data.token.access);
      const decodedToken = jwtDecode(data.data.token.access);
      console.log('Decoded Token:', decodedToken);
      console.log(decodedToken.user_id)
      setLoggedInUserUUID(decodedToken.user_id);
      console.log("decodedToken.user_id")
      // setUserList(data.users);  // Fetch and display users after login
      navigate('/users');  // Redirect to user list page after successful login
    } catch (err) {
      console.log('hhdhdhdh')
      setError('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
