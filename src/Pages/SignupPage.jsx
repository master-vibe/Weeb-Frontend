import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "../Components/UI/Button";
import ApiService from "../Services/ApiService";

export default function SignupPage({ setUsername, setIsLoggedIn }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (name.trim() && email.trim() && password.trim() && confirmPassword.trim()) {
            if (password === confirmPassword) {
                try {
                    const response = await ApiService.request("/auth/register", "POST", {
                        data: {
                            username: name,
                            email,
                            password,
                        },
                    });
                    if (response.success) {
                        setUsername(name);
                        setIsLoggedIn(true);
                        navigate("/home");
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                alert("Passwords do not match");
            }
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
                <h1 className="text-xl font-bold mb-4">Signup</h1>
                <input
                    type="text"
                    className="border p-2 w-full rounded mb-4"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    className="border p-2 w-full rounded mb-4"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="border p-2 w-full rounded mb-4"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="border p-2 w-full rounded mb-4"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button onClick={handleSignup} className="w-full mb-2">
                    Signup
                </Button>
            </div>
        </div>
    );
}