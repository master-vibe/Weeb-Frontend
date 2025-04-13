import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import ChatPage from "../Pages/ChatPage";
import SignupPage from "../Pages/SignupPage";

export default function AppWrapper() {
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<SignupPage setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/home" element={isLoggedIn ? <HomePage username={username} /> : <Navigate to="/login" />} />
                <Route path="/chat" element={isLoggedIn ? <ChatPage username={username} /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

