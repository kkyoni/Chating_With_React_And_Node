import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [ws, setWs] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [chat, setChat] = useState([]);
    const [token, setToken] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        if (token) {
            const websocket = new WebSocket('ws://localhost:8080');
            setWs(websocket);

            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                // Display the message received from the WebSocket server
                setChat((prevChat) => [
                    ...prevChat,
                    `${data.senderId === token ? 'You' : data.senderId}: ${data.content}`,
                ]);
            };

            return () => websocket.close();
        }
    }, [token]);

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:3001/register', { username, password });
            alert('Registration successful! You can now log in.');
            setIsRegistering(false);
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Try a different username.');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            setToken(response.data.token);
            setUsername(response.data.username);
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Check your username and password.');
        }
    };

    const handleSendMessage = () => {
        if (ws && message && receiverId) {
            const messageData = JSON.stringify({ token, receiver_id: receiverId, content: message });
            ws.send(messageData);
            setMessage('');
        }
    };

    if (!token) {
        return (
            <div>
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isRegistering ? (
                    <>
                        <button onClick={handleRegister}>Register</button>
                        <p>
                            Already have an account?{' '}
                            <button onClick={() => setIsRegistering(false)}>
                                Log in here
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <button onClick={handleLogin}>Login</button>
                        <p>
                            Don't have an account?{' '}
                            <button onClick={() => setIsRegistering(true)}>
                                Register here
                            </button>
                        </p>
                    </>
                )}
            </div>
        );
    }

    return (
        <div>
            <h2>Welcome, {username}</h2>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="number"
                    placeholder="Receiver ID"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                />
            </div>
            <div style={{ border: '1px solid #ddd', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {chat.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default App;
