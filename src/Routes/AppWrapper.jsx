import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import ChatPage from "../Pages/ChatPage";
import SignupPage from "../Pages/SignupPage";
import { StompProvider } from "../Utils/StompContext";
import { setLocalStorage, getLocalStorage } from "../Utils/LocalStorage";

export default function AppWrapper() {
    const [username, setUsername] = useState(getLocalStorage("username") || "");
    const [isLoggedIn, setIsLoggedIn] = useState(getLocalStorage("isLoggedIn") || false);

    // Initialize from localStorage once on mount
    useEffect(() => {
        const storedUsername = getLocalStorage("username");
        const storedLoginStatus = getLocalStorage("isLoggedIn");

        if (storedLoginStatus === "true") {
            setUsername(storedUsername);
            setIsLoggedIn(true);
        }
    }, []);

    // Save values to localStorage whenever they change
    useEffect(() => {
        setLocalStorage("username", username);
        setLocalStorage("isLoggedIn", isLoggedIn);
    }, [username, isLoggedIn]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<SignupPage setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/home" element={isLoggedIn ? <StompProvider><HomePage username={username} /></StompProvider> : <Navigate to="/login" />} />
                <Route path="/chat/:contact" element={isLoggedIn ? <StompProvider><ChatPage username={username} contact={username} /></StompProvider> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

